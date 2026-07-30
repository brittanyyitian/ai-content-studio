type Dataset = "posts" | "videos" | "projects" | "papers" | "news";
type AttemptOutcome = "success" | "partial" | "failed" | "rate_limited";

export type EvidenceItem = {
  id: string;
  provider: string;
  dataset: Dataset;
  sourceType: string;
  author: string;
  url: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  capturedAt: string;
  engagement: Record<string, number>;
  discussionUrl: string;
  discussionSamples: string[];
  contentHash: string;
};

export type ProviderAttempt = {
  provider: string;
  outcome: AttemptOutcome;
  itemCount: number;
  reason: string;
  startedAt: string;
  endedAt: string;
};

export type CoverageGap = {
  dimension: string;
  scope: string;
  reason: string;
  impact: string;
  manualTask: string;
};

export type DiscoveredHotspot = {
  id: number;
  rank: number;
  source: string;
  sourceUrl: string;
  sourceType: string;
  age: string;
  title: string;
  summary: string;
  heat: number;
  scarcity: number;
  fit: number;
  reason: string;
  angle: string;
  platforms: string[];
  category: string;
  status: "待选题" | "待审核";
  selected: boolean;
  assignee: string;
  live: true;
  sourceCapturedAt: string;
  evidenceConfidence: number;
  domesticCoverage: string;
  humanCheck: string;
  evidenceId: string;
  engagement: Record<string, number>;
  engagementLabel: string;
  discussionUrl: string;
  discussionFocus: string[];
  reuseIdeas: string[];
  localizedTranslation: string;
  analysisState: "待模型分析" | "规则初判";
};

export type DiscoveredDraft = {
  id: number;
  hotspotId: number;
  platform: string;
  title: string;
  body: string;
  visual: string;
  version: string;
  updatedBy: string;
  status: "待选题";
};

type ProviderResult = {
  provider: string;
  items: EvidenceItem[];
  attempt: ProviderAttempt;
};

type DiscoveryOptions = {
  editorialBrief: string;
  braveSearchKey?: string;
  youtubeApiKey?: string;
  xBearerToken?: string;
};

type HnHit = {
  objectID?: string;
  title?: string;
  story_title?: string;
  url?: string;
  story_url?: string;
  author?: string;
  created_at?: string;
  points?: number;
  num_comments?: number;
  story_text?: string;
};

type GitHubRepo = {
  id?: number;
  full_name?: string;
  html_url?: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  watchers_count?: number;
  topics?: string[];
  owner?: { login?: string };
};

type HnItem = {
  kids?: number[];
  text?: string;
  deleted?: boolean;
  dead?: boolean;
};

type YouTubeSearchResponse = {
  items?: Array<{ id?: { videoId?: string } }>;
};

type YouTubeVideo = {
  id?: string;
  snippet?: {
    channelTitle?: string;
    title?: string;
    description?: string;
    publishedAt?: string;
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
};

type YouTubeVideosResponse = {
  items?: YouTubeVideo[];
};

type YouTubeCommentsResponse = {
  items?: Array<{
    snippet?: {
      topLevelComment?: {
        snippet?: { textDisplay?: string };
      };
    };
  }>;
};

type XRecentResponse = {
  data?: Array<{
    id?: string;
    author_id?: string;
    created_at?: string;
    text?: string;
    public_metrics?: {
      impression_count?: number;
      like_count?: number;
      reply_count?: number;
      retweet_count?: number;
      quote_count?: number;
      bookmark_count?: number;
    };
  }>;
  includes?: {
    users?: Array<{ id?: string; username?: string; name?: string }>;
  };
};

const USER_AGENT = "tide-ai-content-studio/0.2 (+private content research)";
const AI_TERMS =
  /\b(ai|llm|agent|agents|artificial intelligence|machine learning|gpt|claude|gemini|openai|anthropic|deepmind|inference|multimodal|embedding|transformer|diffusion|computer vision|language model)\b/i;

export async function discoverDaily(options: DiscoveryOptions) {
  const capturedAt = new Date().toISOString();
  const providerJobs: Array<Promise<ProviderResult>> = [
    runProvider("Hacker News", () => fetchHackerNews(capturedAt)),
    runProvider("GitHub", () => fetchGitHub(capturedAt)),
    runProvider("OpenAI News", () =>
      fetchRssProvider({
        provider: "OpenAI News",
        url: "https://openai.com/news/rss.xml",
        dataset: "news",
        sourceType: "官方资讯",
        capturedAt,
      }),
    ),
    runProvider("TechCrunch AI", () =>
      fetchRssProvider({
        provider: "TechCrunch AI",
        url: "https://techcrunch.com/category/artificial-intelligence/feed/",
        dataset: "news",
        sourceType: "AI 媒体",
        capturedAt,
      }),
    ),
    runProvider("arXiv", () => fetchArxiv(capturedAt)),
  ];
  if (options.youtubeApiKey?.trim()) {
    providerJobs.push(
      runProvider("YouTube", () =>
        fetchYouTube(capturedAt, options.youtubeApiKey!.trim()),
      ),
    );
  }
  if (options.xBearerToken?.trim()) {
    providerJobs.push(
      runProvider("X", () =>
        fetchXRecent(capturedAt, options.xBearerToken!.trim()),
      ),
    );
  }
  const providers = await Promise.all(providerJobs);

  const gaps: CoverageGap[] = [
    {
      dimension: "source_coverage",
      scope: "Instagram / LinkedIn / TikTok / Dribbble / Reddit",
      reason: "这些平台不提供适合本项目免费抓取全站热门内容的开放接口。",
      impact: "创作者帖子通过人工观察箱补充，不伪造全站覆盖。",
      manualTask: "运营登录自己的平台账号，粘贴原帖链接、原文和公开互动。",
    },
  ];
  if (!options.youtubeApiKey?.trim()) {
    gaps.push({
      dimension: "source_coverage",
      scope: "YouTube",
      reason: "尚未配置免费的 YouTube Data API 配额。",
      impact: "当前不会自动取得视频播放、点赞和评论。",
      manualTask: "配置 YouTube API Key，或把重点视频加入人工观察箱。",
    });
  }
  if (!options.xBearerToken?.trim()) {
    gaps.push({
      dimension: "source_coverage",
      scope: "X",
      reason: "尚未启用 X 官方按量接口。",
      impact: "当前不会自动读取 X 帖子及公开互动。",
      manualTask: "需要时设置月度预算并配置 Bearer Token，或人工补充重点帖子。",
    });
  }

  for (const result of providers) {
    if (result.attempt.outcome !== "success") {
      gaps.push({
        dimension: "provider_availability",
        scope: result.provider,
        reason: result.attempt.reason || "本轮未取得有效数据。",
        impact: "该来源不参与本轮排序。",
        manualTask: "查看原始来源或等待下一轮采集。",
      });
    }
  }

  const allEvidence = providers.flatMap((result) => result.items);
  const clustered = balancedTake(
    clusterEvidence(allEvidence)
      .filter(isRelevant)
      .sort(
        (a, b) =>
          preliminaryScore(b, options.editorialBrief) -
          preliminaryScore(a, options.editorialBrief),
      ),
    20,
  );

  const braveKey = options.braveSearchKey?.trim();
  const domesticChecks = braveKey
    ? await Promise.all(clustered.map((item) => checkDomesticCoverage(item, braveKey)))
    : clustered.map(() => ({
        scarcity: 55,
        label: "国内公开搜索未接入 · 稀缺分已封顶",
        resultCount: 0,
      }));

  if (!braveKey) {
    gaps.push({
      dimension: "domestic_coverage",
      scope: "小红书 / 公众号 / 知乎 / B站",
      reason: "尚未配置合规网页搜索接口。",
      impact: "国内稀缺分统一封顶为 55，不把“没搜到”当成信息差。",
      manualTask: "发布前人工搜索核心主张；接入搜索接口后自动做语义比对。",
    });
  }

  const ranked = clustered
    .map((item, index) => {
      const category = deriveCategory(item);
      const heat = heatScore(item);
      const scarcity = domesticChecks[index].scarcity;
      const fit = fitScore(item, category, options.editorialBrief);
      const confidence = evidenceConfidence(item);
      const actionability = actionabilityScore(category);
      const accessibility = audienceAccessibility(item);
      const final =
        heat * 0.32 +
        scarcity * 0.1 +
        fit * 0.18 +
        actionability * 0.15 +
        accessibility * 0.15 +
        confidence * 0.1;
      return {
        item,
        category,
        heat,
        scarcity,
        fit,
        confidence,
        actionability,
        accessibility,
        final,
        domestic: domesticChecks[index],
      };
    })
    .sort((a, b) => b.final - a.final);

  const recommendedIds = selectRecommendations(ranked);
  const baseId = Date.now();
  const hotspots: DiscoveredHotspot[] = ranked.map((entry, index) => {
    const selected = recommendedIds.has(entry.item.id);
    const id = baseId + index;
    const angle = buildAngle(entry.item, entry.category);
    const domesticSentence = braveKey
      ? `国内公开网页比对发现 ${entry.domestic.resultCount} 条相关结果，当前稀缺度 ${entry.scarcity}。`
      : "国内语义查重尚未接入，稀缺分已按规则封顶，不能据此声称“国内没人发”。";
    return {
      id,
      rank: index + 1,
      source: entry.item.provider,
      sourceUrl: entry.item.url,
      sourceType: entry.item.sourceType,
      age: formatAge(entry.item.publishedAt),
      title: entry.item.title,
      summary: buildSummary(entry.item, entry.category),
      heat: entry.heat,
      scarcity: entry.scarcity,
      fit: entry.fit,
      reason: `${entry.item.provider} 的时效与公开互动信号进入今日前列（${formatEngagement(entry.item)}）。${domesticSentence}`,
      angle,
      platforms: platformsFor(entry.category),
      category: entry.category,
      status: selected ? "待审核" : "待选题",
      selected,
      assignee: "待分配",
      live: true,
      sourceCapturedAt: entry.item.capturedAt,
      evidenceConfidence: entry.confidence,
      domesticCoverage: entry.domestic.label,
      humanCheck: "核对原文事实、发布日期和上下文；补做目标平台站内搜索后再批准文案。",
      evidenceId: entry.item.id,
      engagement: entry.item.engagement,
      engagementLabel: formatEngagement(entry.item),
      discussionUrl: entry.item.discussionUrl,
      discussionFocus: buildDiscussionFocus(entry.item),
      reuseIdeas: buildReuseIdeas(entry.item, entry.category),
      localizedTranslation: buildLocalizedTranslation(entry.item),
      analysisState: "规则初判",
    };
  });

  const drafts: DiscoveredDraft[] = hotspots
    .filter((item) => item.selected)
    .map((hotspot, index) => buildDraft(hotspot, baseId + 100 + index));

  if (hotspots.length < 20) {
    gaps.push({
      dimension: "daily_pool",
      scope: "今日候选池",
      reason: `去重和相关性过滤后只有 ${hotspots.length} 条合格内容。`,
      impact: "不使用低质量内容补足数量。",
      manualTask: "人工补充重点创作者与视频平台来源。",
    });
  }

  return {
    capturedAt,
    hotspots,
    drafts,
    evidence: ranked.map((entry) => entry.item),
    attempts: providers.map((result) => result.attempt),
    gaps,
    coverageLabel: braveKey
      ? `${providers.length} 个自动来源 · 国内公开网页已比对`
      : `${providers.length} 个自动来源 · 大社媒由人工观察箱补充`,
  };
}

async function runProvider(
  provider: string,
  operation: () => Promise<EvidenceItem[]>,
): Promise<ProviderResult> {
  const startedAt = new Date().toISOString();
  try {
    const items = await operation();
    return {
      provider,
      items,
      attempt: {
        provider,
        outcome: items.length ? "success" : "partial",
        itemCount: items.length,
        reason: items.length ? "" : "来源可访问，但本轮没有合格 AI 内容。",
        startedAt,
        endedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知错误";
    return {
      provider,
      items: [],
      attempt: {
        provider,
        outcome: message.includes("429") ? "rate_limited" : "failed",
        itemCount: 0,
        reason: safeReason(message),
        startedAt,
        endedAt: new Date().toISOString(),
      },
    };
  }
}

async function fetchHackerNews(capturedAt: string) {
  const since = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 7;
  const queries = [
    "AI",
    "ChatGPT",
    "Claude",
    "Gemini",
    "AI jobs",
    "AI education",
    "AI productivity",
    "AI video",
  ];
  const payloads = await Promise.all(
    queries.map((query) =>
      fetchJson<{ hits?: HnHit[] }>(
        `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&numericFilters=created_at_i>${since},points>50&hitsPerPage=50`,
      ),
    ),
  );
  const uniqueHits = [
    ...new Map(
      payloads
        .flatMap((payload) => payload.hits ?? [])
        .filter(
          (hit) =>
            Boolean(hit.title || hit.story_title) &&
            (finite(hit.points) >= 50 || finite(hit.num_comments) >= 30),
        )
        .map((hit) => [hit.objectID || `${hit.title}-${hit.created_at}`, hit]),
    ).values(),
  ];
  return Promise.all(
    uniqueHits
      .map(async (hit) => {
        const title = cleanText(hit.title || hit.story_title || "");
        const id = hit.objectID || title;
        const url =
          hit.url ||
          hit.story_url ||
          `https://news.ycombinator.com/item?id=${encodeURIComponent(id)}`;
        const discussionUrl = `https://news.ycombinator.com/item?id=${encodeURIComponent(id)}`;
        const discussionSamples = await fetchHnDiscussion(id);
        return makeEvidence({
          sourceId: `hn-${id}`,
          provider: "Hacker News",
          dataset: "posts",
          sourceType: "开发者社区",
          author: hit.author || "",
          url,
          title,
          excerpt: cleanText(hit.story_text || ""),
          publishedAt: toIso(hit.created_at),
          capturedAt,
          engagement: {
            points: finite(hit.points),
            comments: finite(hit.num_comments),
          },
          discussionUrl,
          discussionSamples,
        });
      }),
  );
}

async function fetchHnDiscussion(id: string) {
  try {
    const story = await fetchJson<HnItem>(
      `https://hacker-news.firebaseio.com/v0/item/${encodeURIComponent(id)}.json`,
    );
    const commentIds = (story.kids ?? []).slice(0, 12);
    const comments = await Promise.all(
      commentIds.map((commentId) =>
        fetchJson<HnItem>(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`,
        ).catch(() => null),
      ),
    );
    return comments
      .filter((comment): comment is HnItem => Boolean(comment && !comment.deleted && !comment.dead))
      .map((comment) => cleanText(comment.text || ""))
      .filter(Boolean)
      .slice(0, 8);
  } catch {
    return [];
  }
}

async function fetchGitHub(capturedAt: string) {
  const since = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const queries = ["AI agent", "LLM tool", "generative AI"];
  const payloads = await Promise.all(
    queries.map((query) =>
      fetchJson<{ items?: GitHubRepo[] }>(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(`${query} created:>${since}`)}&sort=stars&order=desc&per_page=20`,
        {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      ),
    ),
  );
  return Promise.all(
    payloads
      .flatMap((payload) => payload.items ?? [])
      .filter(
        (repo) =>
          repo.full_name &&
          repo.html_url &&
          finite(repo.stargazers_count) >= 100,
      )
      .map((repo) =>
        makeEvidence({
          sourceId: `github-${repo.id || repo.full_name}`,
          provider: "GitHub",
          dataset: "projects",
          sourceType: "开源项目",
          author: repo.owner?.login || "",
          url: repo.html_url || "",
          title: repo.full_name || "",
          excerpt: cleanText(repo.description || ""),
          publishedAt: toIso(repo.created_at || repo.updated_at),
          capturedAt,
          engagement: {
            stars: finite(repo.stargazers_count),
            forks: finite(repo.forks_count),
            openIssues: finite(repo.open_issues_count),
            watchers: finite(repo.watchers_count),
          },
          discussionUrl: repo.html_url || "",
          discussionSamples: (repo.topics ?? []).map((topic) => `GitHub topic: ${topic}`),
        }),
      ),
  );
}

async function fetchRssProvider(options: {
  provider: string;
  url: string;
  dataset: Dataset;
  sourceType: string;
  capturedAt: string;
}) {
  const xml = await fetchText(options.url);
  const items = parseXmlBlocks(xml, "item").slice(0, 30);
  return Promise.all(
    items.map((item, index) => {
      const title = cleanText(xmlValue(item, "title"));
      const link = cleanText(xmlValue(item, "link"));
      const description = cleanText(
        xmlValue(item, "description") || xmlValue(item, "content:encoded"),
      );
      const author =
        cleanText(xmlValue(item, "dc:creator")) || options.provider;
      const publishedAt = toIso(
        xmlValue(item, "pubDate") || xmlValue(item, "dc:date"),
      );
      return makeEvidence({
        sourceId: `${slug(options.provider)}-${index}-${link || title}`,
        provider: options.provider,
        dataset: options.dataset,
        sourceType: options.sourceType,
        author,
        url: link,
        title,
        excerpt: description,
        publishedAt,
        capturedAt: options.capturedAt,
        engagement: {},
        discussionUrl: link,
        discussionSamples: [],
      });
    }),
  );
}

async function fetchArxiv(capturedAt: string) {
  const query = encodeURIComponent("(cat:cs.AI OR cat:cs.CL OR cat:cs.LG)");
  const xml = await fetchText(
    `https://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=20&sortBy=submittedDate&sortOrder=descending`,
  );
  const entries = parseXmlBlocks(xml, "entry");
  return Promise.all(
    entries.map((entry, index) => {
      const id = cleanText(xmlValue(entry, "id"));
      return makeEvidence({
        sourceId: `arxiv-${index}-${id}`,
        provider: "arXiv",
        dataset: "papers",
        sourceType: "研究论文",
        author: cleanText(xmlValue(entry, "name")),
        url: id,
        title: cleanText(xmlValue(entry, "title")),
        excerpt: cleanText(xmlValue(entry, "summary")),
        publishedAt: toIso(xmlValue(entry, "published")),
        capturedAt,
        engagement: {},
        discussionUrl: id,
        discussionSamples: [],
      });
    }),
  );
}

async function fetchYouTube(capturedAt: string, apiKey: string) {
  const publishedAfter = new Date(Date.now() - 7 * 86400000).toISOString();
  const search = await fetchJson<YouTubeSearchResponse>(
    `https://www.googleapis.com/youtube/v3/search?part=id&type=video&order=viewCount&maxResults=35&relevanceLanguage=en&publishedAfter=${encodeURIComponent(publishedAfter)}&q=${encodeURIComponent("AI|ChatGPT|Claude|Gemini")}&key=${encodeURIComponent(apiKey)}`,
  );
  const ids = (search.items ?? [])
    .map((item) => item.id?.videoId || "")
    .filter(Boolean);
  if (!ids.length) return [];

  const videos = await fetchJson<YouTubeVideosResponse>(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${encodeURIComponent(ids.join(","))}&key=${encodeURIComponent(apiKey)}`,
  );

  return Promise.all(
    (videos.items ?? []).map(async (video) => {
      const id = video.id || "";
      const comments = await fetchYouTubeComments(id, apiKey);
      return makeEvidence({
        sourceId: `youtube-${id}`,
        provider: "YouTube",
        dataset: "videos",
        sourceType: "视频社区",
        author: cleanText(video.snippet?.channelTitle || ""),
        url: `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`,
        title: cleanText(video.snippet?.title || ""),
        excerpt: cleanText(video.snippet?.description || ""),
        publishedAt: toIso(video.snippet?.publishedAt),
        capturedAt,
        engagement: {
          views: finiteString(video.statistics?.viewCount),
          likes: finiteString(video.statistics?.likeCount),
          comments: finiteString(video.statistics?.commentCount),
        },
        discussionUrl: `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`,
        discussionSamples: comments,
      });
    }),
  );
}

async function fetchYouTubeComments(videoId: string, apiKey: string) {
  try {
    const payload = await fetchJson<YouTubeCommentsResponse>(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${encodeURIComponent(videoId)}&order=relevance&maxResults=5&textFormat=plainText&key=${encodeURIComponent(apiKey)}`,
    );
    return (payload.items ?? [])
      .map(
        (item) =>
          item.snippet?.topLevelComment?.snippet?.textDisplay || "",
      )
      .map(cleanText)
      .filter(Boolean)
      .slice(0, 5);
  } catch {
    return [];
  }
}

async function fetchXRecent(capturedAt: string, bearerToken: string) {
  const query =
    "(AI OR ChatGPT OR Claude OR Gemini) -is:retweet lang:en";
  const payload = await fetchJson<XRecentResponse>(
    `https://api.x.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=100&tweet.fields=author_id,created_at,public_metrics,lang,text&expansions=author_id&user.fields=username,name`,
    { Authorization: `Bearer ${bearerToken}` },
  );
  const users = new Map(
    (payload.includes?.users ?? []).map((user) => [user.id || "", user]),
  );

  return Promise.all(
    (payload.data ?? [])
      .filter((post) => {
        const metrics = post.public_metrics;
        return (
          finite(metrics?.like_count) >= 100 ||
          finite(metrics?.reply_count) >= 20 ||
          finite(metrics?.retweet_count) >= 30
        );
      })
      .map((post) => {
        const author = users.get(post.author_id || "");
        const username = author?.username || "";
        const id = post.id || "";
        const text = cleanText(post.text || "");
        return makeEvidence({
          sourceId: `x-${id}`,
          provider: "X",
          dataset: "posts",
          sourceType: "社媒帖子",
          author: author?.name || username,
          url: username
            ? `https://x.com/${encodeURIComponent(username)}/status/${encodeURIComponent(id)}`
            : `https://x.com/i/web/status/${encodeURIComponent(id)}`,
          title: truncate(text, 120),
          excerpt: text,
          publishedAt: toIso(post.created_at),
          capturedAt,
          engagement: {
            views: finite(post.public_metrics?.impression_count),
            likes: finite(post.public_metrics?.like_count),
            comments: finite(post.public_metrics?.reply_count),
            reposts: finite(post.public_metrics?.retweet_count),
            quotes: finite(post.public_metrics?.quote_count),
            bookmarks: finite(post.public_metrics?.bookmark_count),
          },
          discussionUrl: username
            ? `https://x.com/${encodeURIComponent(username)}/status/${encodeURIComponent(id)}`
            : `https://x.com/i/web/status/${encodeURIComponent(id)}`,
          discussionSamples: [],
        });
      }),
  );
}

async function checkDomesticCoverage(item: EvidenceItem, key: string) {
  try {
    const query = `${keyTerms(item.title).join(" ")} (site:zhihu.com OR site:xiaohongshu.com OR site:mp.weixin.qq.com OR site:bilibili.com)`;
    const payload = await fetchJson<{
      web?: { results?: Array<{ title?: string; description?: string; url?: string }> };
    }>(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=8&country=CN&search_lang=zh-hans`,
      {
        Accept: "application/json",
        "X-Subscription-Token": key,
      },
    );
    const results = payload.web?.results ?? [];
    const maxSimilarity = results.reduce((maximum, result) => {
      const candidate = `${result.title || ""} ${result.description || ""}`;
      return Math.max(maximum, similarity(item.title, candidate));
    }, 0);
    const scarcity = clamp(Math.round(100 - maxSimilarity * 100), 20, 95);
    return {
      scarcity,
      resultCount: results.length,
      label:
        scarcity >= 70
          ? `国内公开搜索相关表达较少 · ${results.length} 条邻近结果`
          : `国内已有相近内容 · ${results.length} 条结果`,
    };
  } catch {
    return {
      scarcity: 55,
      resultCount: 0,
      label: "国内搜索本轮失败 · 稀缺分已封顶",
    };
  }
}

async function makeEvidence(input: {
  sourceId: string;
  provider: string;
  dataset: Dataset;
  sourceType: string;
  author: string;
  url: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  capturedAt: string;
  engagement: Record<string, number>;
  discussionUrl?: string;
  discussionSamples?: string[];
}): Promise<EvidenceItem> {
  const canonical = `${input.provider}|${input.url}|${input.title}`;
  const contentHash = await sha256(canonical);
  return {
    id: `${slug(input.provider)}-${contentHash.slice(0, 18)}`,
    provider: input.provider,
    dataset: input.dataset,
    sourceType: input.sourceType,
    author: input.author,
    url: input.url,
    title: input.title,
    excerpt: truncate(input.excerpt, 600),
    publishedAt: input.publishedAt,
    capturedAt: input.capturedAt,
    engagement: input.engagement,
    discussionUrl: input.discussionUrl || input.url,
    discussionSamples: input.discussionSamples ?? [],
    contentHash,
  };
}

function clusterEvidence(items: EvidenceItem[]) {
  const clusters: EvidenceItem[] = [];
  for (const item of items) {
    if (!item.title || !item.url) continue;
    const duplicate = clusters.find(
      (existing) =>
        normalizeUrl(existing.url) === normalizeUrl(item.url) ||
        similarity(existing.title, item.title) >= 0.76,
    );
    if (!duplicate) {
      clusters.push(item);
      continue;
    }
    if (rawEngagement(item) > rawEngagement(duplicate)) {
      clusters[clusters.indexOf(duplicate)] = item;
    }
  }
  return clusters;
}

function selectRecommendations<T extends { item: EvidenceItem; category: string; final: number }>(
  ranked: T[],
) {
  const selected = new Set<string>();
  const categoryCounts = new Map<string, number>();
  const providerCounts = new Map<string, number>();
  let industryCount = 0;
  const minimumMix = [
    "AI 技巧",
    "AI 技巧",
    "实操案例",
    "接单变现",
    "个人 IP",
  ];

  for (const category of minimumMix) {
    const entry = ranked.find(
      (candidate) =>
        candidate.category === category &&
        !selected.has(candidate.item.id) &&
        !isSensitive(candidate.item) &&
        (providerCounts.get(candidate.item.provider) ?? 0) <
          (candidate.item.provider === "Hacker News" ? 5 : 2),
    );
    if (!entry) continue;
    selected.add(entry.item.id);
    categoryCounts.set(
      entry.category,
      (categoryCounts.get(entry.category) ?? 0) + 1,
    );
    providerCounts.set(
      entry.item.provider,
      (providerCounts.get(entry.item.provider) ?? 0) + 1,
    );
  }

  for (const entry of ranked) {
    if (selected.size >= 6) break;
    if (selected.has(entry.item.id)) continue;
    if (isSensitive(entry.item)) continue;
    if (entry.category === "产业观察" && industryCount >= 2) continue;
    if ((categoryCounts.get(entry.category) ?? 0) >= 3) continue;
    if (
      (providerCounts.get(entry.item.provider) ?? 0) >=
      (entry.item.provider === "Hacker News" ? 5 : 2)
    ) continue;
    selected.add(entry.item.id);
    if (entry.category === "产业观察") industryCount += 1;
    categoryCounts.set(
      entry.category,
      (categoryCounts.get(entry.category) ?? 0) + 1,
    );
    providerCounts.set(
      entry.item.provider,
      (providerCounts.get(entry.item.provider) ?? 0) + 1,
    );
  }
  for (const entry of ranked) {
    if (selected.size >= 6) break;
    if (selected.has(entry.item.id) || isSensitive(entry.item)) continue;
    if (entry.category === "产业观察" && industryCount >= 2) continue;
    selected.add(entry.item.id);
    if (entry.category === "产业观察") industryCount += 1;
  }
  return selected;
}

function buildDraft(hotspot: DiscoveredHotspot, id: number): DiscoveredDraft {
  const platform = hotspot.platforms[0] || "小红书";
  return {
    id,
    hotspotId: hotspot.id,
    platform,
    title: hotspot.angle,
    body:
      `【自动采集线索，不能直接发布】\n\n` +
      `已采集原帖：${hotspot.title}\n` +
      `公开互动：${hotspot.engagementLabel}\n` +
      `本地化状态：${hotspot.localizedTranslation}\n\n` +
      `需要由每日内容运营任务完成评论归纳、事实核验和中文本地化。`,
    visual: "完成选题和事实核验后再确定配图。",
    version: "V1 · 自动采集，待整理",
    updatedBy: "采集器",
    status: "待选题",
  };
}

function formatEngagement(item: EvidenceItem) {
  const value = item.engagement;
  if (item.provider === "Hacker News") {
    return `${finite(value.points)} 点赞积分 · ${finite(value.comments)} 条评论`;
  }
  if (item.provider === "GitHub") {
    return `${finite(value.stars)} Stars · ${finite(value.forks)} Forks · ${finite(value.openIssues)} 个开放 Issue`;
  }
  if (item.provider === "YouTube") {
    return `${formatCount(value.views)} 次播放 · ${formatCount(value.likes)} 点赞 · ${formatCount(value.comments)} 条评论`;
  }
  if (item.provider === "X") {
    const views = finite(value.views)
      ? `${formatCount(value.views)} 次浏览 · `
      : "浏览量未公开 · ";
    return `${views}${formatCount(value.likes)} 点赞 · ${formatCount(value.comments)} 条回复 · ${formatCount(value.reposts)} 次转发`;
  }
  return "原平台未公开点赞、评论或浏览量";
}

function buildDiscussionFocus(item: EvidenceItem) {
  if (!item.discussionSamples.length) {
    return ["暂无可验证评论样本；不能推断读者主要在讨论什么。"];
  }
  return item.discussionSamples
    .map((sample) => truncate(sample, 150))
    .filter(Boolean)
    .slice(0, 3);
}

function buildReuseIdeas(item: EvidenceItem, category: string) {
  const subject = truncate(item.title, 52);
  if (category === "AI 技巧") {
    return [
      `把「${subject}」放进一个真实工作任务，记录输入、过程和结果`,
      "提炼成 3 步操作卡，并补充不适用场景",
      "用国内用户熟悉的工具、价格和工作环境替换海外语境",
    ];
  }
  if (category === "实操案例" || category === "接单变现") {
    return [
      "拆解交付对象、成本、耗时和验收标准，不转述收入噱头",
      "补一个国内真实业务案例或亲自复现实验",
      "改写为清单、报价结构或 30 秒口播",
    ];
  }
  return [
    `解释「${subject}」对普通用户或小团队的具体影响`,
    "区分已确认事实、海外观点和作者自己的判断",
    "加入国内产品、监管、价格或使用习惯的差异",
  ];
}

function buildLocalizedTranslation(item: EvidenceItem) {
  const original = item.excerpt || item.title;
  return `已保留原文，完整中文翻译待内容运营补充：${truncate(original, 180)}`;
}

function deriveCategory(item: EvidenceItem) {
  const text = `${item.title} ${item.excerpt}`.toLowerCase();
  if (isSensitive(item)) return "产业观察";
  if (item.provider === "arXiv") return "产业观察";
  if (
    item.provider === "TechCrunch AI" &&
    /(startup|raises|funding|deal|acqui|valuation|accuses)/.test(text)
  ) {
    return "产业观察";
  }
  if (item.provider === "OpenAI News" && /(launching|announc|infrastructure)/.test(text)) {
    return "产业观察";
  }
  if (/(freelanc|revenue|pricing|client|consult|agency|business)/.test(text)) return "接单变现";
  if (/(creator|content|marketing|audience|newsletter|social|jobs?|career|focus|burnout)/.test(text)) return "个人 IP";
  if (/(workflow|tutorial|how to|prompt|coding|automation|productivity|tool|learn|education|study)/.test(text)) return "AI 技巧";
  if (/(launch|open source|github|demo|build|app|product)/.test(text)) return "实操案例";
  return "产业观察";
}

function buildAngle(item: EvidenceItem, category: string) {
  const subject = truncate(item.title, 54);
  if (category === "接单变现") return `别只看工具：从「${subject}」拆解交付与定价机会`;
  if (category === "个人 IP") return `从「${subject}」提炼一个个人 IP 可持续表达的观点`;
  if (category === "AI 技巧") return `把「${subject}」变成普通人能复用的 3 步工作流`;
  if (category === "实操案例") return `不做产品搬运：用真实任务验证「${subject}」`;
  return `「${subject}」会怎样影响小团队接下来 6 个月`;
}

function buildSummary(item: EvidenceItem, category: string) {
  const signal =
    item.excerpt || `原始来源正在讨论 ${item.title}`;
  return `${item.provider} 出现一条新的${category}信号。原始摘要：${truncate(signal, 118)}`;
}

function platformsFor(category: string) {
  if (category === "产业观察") return ["公众号", "知乎", "即刻"];
  if (category === "个人 IP") return ["小红书", "公众号", "即刻"];
  if (category === "接单变现") return ["小红书", "抖音", "公众号"];
  if (category === "实操案例") return ["小红书", "视频号", "抖音"];
  return ["小红书", "公众号", "视频号"];
}

function preliminaryScore(item: EvidenceItem, brief: string) {
  const category = deriveCategory(item);
  const score =
    heatScore(item) * 0.42 +
    fitScore(item, category, brief) * 0.28 +
    audienceAccessibility(item) * 0.2 +
    evidenceConfidence(item) * 0.1;
  return score - (isSensitive(item) ? 28 : 0);
}

function heatScore(item: EvidenceItem) {
  const ageHours = Math.max(
    0,
    (Date.now() - new Date(item.publishedAt).getTime()) / 3600000,
  );
  const freshness = clamp(100 - ageHours * 1.1, 35, 100);
  const raw = rawEngagement(item);
  const engagement = raw ? clamp(42 + Math.log10(raw + 1) * 20, 42, 98) : 58;
  const sourceBoost =
    item.provider === "Hacker News" ||
    item.provider === "GitHub" ||
    item.provider === "YouTube" ||
    item.provider === "X"
      ? 6
      : 0;
  return clamp(Math.round(freshness * 0.46 + engagement * 0.54 + sourceBoost), 30, 98);
}

function fitScore(item: EvidenceItem, category: string, brief: string) {
  if (isSensitive(item)) return 35;
  let score =
    category === "AI 技巧" || category === "实操案例"
      ? 88
      : category === "接单变现" || category === "个人 IP"
        ? 84
        : 72;
  const normalizedBrief = brief.toLowerCase();
  if (
    normalizedBrief &&
    keyTerms(`${item.title} ${item.excerpt}`).some((term) =>
      normalizedBrief.includes(term.toLowerCase()),
    )
  ) {
    score += 8;
  }
  if (/技巧|实操|操作/.test(brief) && (category === "AI 技巧" || category === "实操案例")) score += 7;
  if (/不要产业|少.*产业/.test(brief) && category === "产业观察") score -= 18;
  score += Math.round((audienceAccessibility(item) - 65) * 0.35);
  return clamp(score, 35, 98);
}

function audienceAccessibility(item: EvidenceItem) {
  const text = `${item.title} ${item.excerpt}`.toLowerCase();
  let score = 62;
  if (
    /(job|career|money|cost|learn|school|student|focus|burnout|creator|video|photo|book|word|document|privacy|work|productivity)/.test(
      text,
    )
  ) {
    score += 24;
  }
  if (
    /(distillation|inference|embedding|transformer|benchmark|token-level|quantization|linear attention|flow polic|orchestration runtime|typescript)/.test(
      text,
    )
  ) {
    score -= 28;
  }
  if (item.provider === "arXiv") score -= 18;
  return clamp(score, 25, 98);
}

function actionabilityScore(category: string) {
  if (category === "AI 技巧") return 94;
  if (category === "实操案例") return 90;
  if (category === "接单变现") return 86;
  if (category === "个人 IP") return 82;
  return 62;
}

function evidenceConfidence(item: EvidenceItem) {
  if (item.provider === "OpenAI News") return 96;
  if (item.provider === "YouTube" || item.provider === "X") return 90;
  if (item.provider === "arXiv") return 88;
  if (item.provider === "GitHub") return 82;
  if (item.provider === "TechCrunch AI") return 79;
  return 72;
}

function rawEngagement(item: EvidenceItem) {
  return Object.values(item.engagement).reduce((sum, value) => sum + value, 0);
}

async function fetchJson<T>(url: string, headers: Record<string, string> = {}) {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, ...headers },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return (await response.json()) as T;
}

async function fetchText(url: string) {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/rss+xml, application/atom+xml, text/xml" },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

function parseXmlBlocks(xml: string, tag: string) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [...xml.matchAll(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "gi"))].map(
    (match) => match[1],
  );
}

function xmlValue(block: string, tag: string) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(
    new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "i"),
  );
  return match?.[1] || "";
}

function cleanText(value: string) {
  return decodeEntities(
    value
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function decodeEntities(value: string) {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
  };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_match, entity: string) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    return named[entity.toLowerCase()] ?? _match;
  });
}

function similarity(left: string, right: string) {
  const a = new Set(ngrams(normalizeText(left)));
  const b = new Set(ngrams(normalizeText(right)));
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function ngrams(value: string) {
  const compact = value.replace(/\s+/g, "");
  if (compact.length < 3) return compact ? [compact] : [];
  return Array.from({ length: compact.length - 2 }, (_, index) =>
    compact.slice(index, index + 3),
  );
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function normalizeUrl(value: string) {
  try {
    const url = new URL(value);
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_|ref|source)/i.test(key)) url.searchParams.delete(key);
    }
    return `${url.hostname}${url.pathname}${url.search}`.replace(/\/$/, "");
  } catch {
    return value;
  }
}

function keyTerms(value: string) {
  const stop = new Set([
    "with",
    "from",
    "that",
    "this",
    "your",
    "using",
    "into",
    "about",
    "open",
    "source",
    "artificial",
    "intelligence",
    "ai",
    "llm",
  ]);
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length >= 3 && !stop.has(token))
    .slice(0, 8);
}

function isRelevant(item: EvidenceItem) {
  if (
    item.provider === "OpenAI News" ||
    item.provider === "TechCrunch AI" ||
    item.provider === "arXiv"
  ) {
    return true;
  }
  if (AI_TERMS.test(item.title)) return true;
  if (item.provider === "Hacker News") return false;
  return AI_TERMS.test(item.excerpt);
}

function isSensitive(item: EvidenceItem) {
  return /(biological weapon|weapon|poison|malware|ransomware|phishing|suicide|self-harm|diagnos|disease|medical|veterinary|investment advice|exploit)/i.test(
    `${item.title} ${item.excerpt}`,
  );
}

function balancedTake(items: EvidenceItem[], limit: number) {
  const caps: Record<string, number> = {
    "Hacker News": 12,
    GitHub: 2,
    "OpenAI News": 2,
    "TechCrunch AI": 2,
    arXiv: 1,
  };
  const selected: EvidenceItem[] = [];
  const counts = new Map<string, number>();
  for (const item of items) {
    if (selected.length >= limit) break;
    const count = counts.get(item.provider) ?? 0;
    if (count >= (caps[item.provider] ?? 3)) continue;
    selected.push(item);
    counts.set(item.provider, count + 1);
  }
  if (selected.length < limit) {
    for (const item of items) {
      if (selected.length >= limit) break;
      if (selected.some((existing) => existing.id === item.id)) continue;
      selected.push(item);
    }
  }
  return selected;
}

function formatAge(value: string) {
  const hours = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 3600000));
  if (hours < 1) return "刚刚";
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "昨天" : `${days} 天前`;
}

function toIso(value?: string) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function finite(value?: number) {
  return Number.isFinite(value) ? Number(value) : 0;
}

function finiteString(value?: string) {
  const parsed = Number.parseInt(value || "0", 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCount(value?: number) {
  return new Intl.NumberFormat("zh-CN", {
    notation: value && value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(finite(value));
}

function truncate(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length - 1).trim()}…` : value;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function safeReason(value: string) {
  return value.replace(/https?:\/\/\S+/g, "[source]").slice(0, 180);
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
