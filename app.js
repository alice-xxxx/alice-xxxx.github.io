const { createApp, computed, ref } = Vue;

createApp({
  setup() {
    const screen = ref("main");
    const tab = ref("discover");
    const discoverCategory = ref("all");
    const libraryCategory = ref("all");
    const search = ref("");
    const searchWasRun = ref(false);
    const selected = ref(null);
    const detailOpen = ref(false);
    const detailTab = ref("info");
    const detailMenuOpen = ref(false);
    const sourceSwitchOpen = ref(false);
    const catalogQuery = ref("");
    const prototypeMapOpen = ref(false);
    const modal = ref(null);
    const activeSource = ref(null);
    const activeRule = ref(null);
    const activeToc = ref(null);
    const activeTts = ref(null);
    const activeArticle = ref(null);
    const sourceQuery = ref("");
    const historyPeriod = ref("近 30 天");
    const historyTab = ref("history");
    const readerMode = ref("novel");
    const readerPanel = ref(null);

    const labels = { novel: "小说", comic: "漫画", video: "视频", audio: "音频" };
    const categories = [
      { value: "all", label: "全部" },
      { value: "novel", label: "小说" },
      { value: "comic", label: "漫画" },
      { value: "video", label: "视频" },
      { value: "audio", label: "音频" }
    ];

    const items = [
      {
        id:"jianlai",type:"novel",title:"剑来",author:"烽火戏诸侯",
        sub:"玄幻 · 少年持剑远游",stat:"326.5 万",
        img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=86",
        kind:"玄幻",wordCount:"1168 万字",chapterCount:1268,latestChapter:"第 1268 章 人间有风雪",
        sourceName:"源仓 · 小说源 A",sourceGroup:"网络小说",progress:"第 923 章 · 73%",
        intro:"天地之间，有个少年背着剑一路远行。山水、江湖、人心和选择，最终都落到脚下这一条路上。"
      },
      {
        id:"youth",type:"comic",title:"我的青春恋爱物语",author:"渡航 / 漫画版",
        sub:"校园 · 青春并不总是甜蜜",stat:"128.4 万",
        img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=86",
        kind:"漫画",wordCount:"84 话",chapterCount:84,latestChapter:"第 84 话 于是，季节继续向前",
        sourceName:"MangaHub",sourceGroup:"漫画",progress:"第 61 话 · 72%",
        intro:"把“正确答案”当作唯一出口的青春，往往会留下更多难以言说的东西。"
      },
      {
        id:"wind",type:"video",title:"去有风的地方",author:"华策影视",
        sub:"治愈 · 旅行 · 8.9 分",stat:"2850.1 万",
        img:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=86",
        kind:"剧集",wordCount:"40 集",chapterCount:40,latestChapter:"第 40 集",
        sourceName:"StreamSource CN",sourceGroup:"视频",progress:"第 18 集 · 23:14",
        intro:"在慢下来的生活里重新理解关系、选择与自己。"
      },
      {
        id:"threebody",type:"novel",title:"三体",author:"刘慈欣",
        sub:"科幻 · 黑暗森林正在展开",stat:"198.3 万",
        img:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=86",
        kind:"科幻",wordCount:"约 88 万字",chapterCount:188,latestChapter:"第三部 · 死神永生",
        sourceName:"本地 EPUB",sourceGroup:"本地",progress:"第 72 章 · 41%",
        intro:"从文化大革命时期的一次秘密工程开始，人类文明被卷入一场跨越星际的长期博弈。"
      },
      {
        id:"oshi",type:"comic",title:"我推的孩子",author:"赤坂明 × 横枪萌果",
        sub:"演艺圈 · 连载中",stat:"312.6 万",
        img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=86",
        kind:"漫画",wordCount:"166 话",chapterCount:166,latestChapter:"第 166 话 星",
        sourceName:"ComicSource JP",sourceGroup:"漫画",progress:"第 143 话 · 86%",
        intro:"聚光灯越明亮，影子就越清晰。"
      },
      {
        id:"goodnight",type:"audio",title:"晚安，陌生人",author:"深夜电台",
        sub:"治愈系 · 每个夜晚的陪伴",stat:"86.4 万",
        img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=86",
        kind:"播客",wordCount:"128 期",chapterCount:128,latestChapter:"EP.128 明天也会有风",
        sourceName:"Podcast RSS",sourceGroup:"音频",progress:"EP.121 · 18:42",
        intro:"给还没睡的人留一盏灯。每一期都是独立节目，也可以从任意一集开始。"
      },
      {
        id:"suzume",type:"video",title:"铃芽之旅",author:"新海诚",
        sub:"动画 · 121 分钟",stat:"412.8 万",
        img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86",
        kind:"电影",wordCount:"121 分钟",chapterCount:1,latestChapter:"正片",
        sourceName:"Anime Stream",sourceGroup:"视频",progress:"正片 · 38:12",
        intro:"门的另一侧，是被遗忘的地方。"
      },
      {
        id:"mysteries",type:"novel",title:"诡秘之主",author:"爱潜水的乌贼",
        sub:"奇幻 · 蒸汽与神秘",stat:"520.7 万",
        img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=86",
        kind:"奇幻",wordCount:"446 万字",chapterCount:1432,latestChapter:"第 1432 章 新的旅程",
        sourceName:"Legado Source",sourceGroup:"网络小说",progress:"第 602 章 · 42%",
        intro:"蒸汽、机械、教会与未知存在交织成一张巨大的网。"
      },
      {
        id:"catnoise",type:"audio",title:"猫的白噪音",author:"睡眠实验室",
        sub:"助眠 · 自然声 · 放松",stat:"214.9 万",
        img:"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=86",
        kind:"白噪音",wordCount:"36 轨",chapterCount:36,latestChapter:"36 · 午后窗边",
        sourceName:"Local Audio",sourceGroup:"本地音频",progress:"12 · 雨夜 · 22:10",
        intro:"把猫的呼吸、窗外的雨和房间里微小的声音留在夜里。"
      },
      {
        id:"blade",type:"comic",title:"镖人",author:"许先哲",
        sub:"武侠 · 第 11 卷",stat:"175.2 万",
        img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86",
        kind:"国漫",wordCount:"112 话",chapterCount:112,latestChapter:"第 112 话",
        sourceName:"本地 CBZ",sourceGroup:"本地",progress:"第 94 话 · 84%",
        intro:"大漠、镖客与乱世里的人。"
      }
    ];

    const libraryIds = new Set(["jianlai","threebody","goodnight","suzume","mysteries","blade"]);

    const navItems = [
      { key:"discover", label:"发现" },
      { key:"library", label:"内容库" },
      { key:"me", label:"我的" }
    ];

    const sourceRows = ref([
      {id:"s1",name:"源仓 · 小说源 A",kind:"小说",group:"网络小说",enabled:true,url:"https://source-a.example.com"},
      {id:"s2",name:"MangaHub",kind:"漫画",group:"漫画",enabled:true,url:"https://manga.example.com"},
      {id:"s3",name:"StreamSource CN",kind:"视频",group:"视频",enabled:true,url:"https://video.example.com"},
      {id:"s4",name:"Podcast RSS",kind:"音频",group:"音频",enabled:true,url:"https://audio.example.com/feed.xml"},
      {id:"s5",name:"Tech Weekly",kind:"RSS",group:"订阅",enabled:true,url:"https://rss.example.com"},
      {id:"s6",name:"Old Book Source",kind:"小说",group:"备用",enabled:false,url:"https://old.example.com"},
      {id:"s7",name:"Comic Mirror",kind:"漫画",group:"备用",enabled:false,url:"https://comic-mirror.example.com"},
      {id:"s8",name:"Documentary World",kind:"视频",group:"视频",enabled:true,url:"https://doc.example.com"}
    ]);

    const articles = [
      {source:"科技周刊",time:"2 小时前",title:"这一周值得关注的开源项目",summary:"从跨平台桌面应用到新的编译工具链，本周有不少值得收藏的项目。",read:false},
      {source:"开发者资讯",time:"5 小时前",title:"浏览器端新 API 的几项变化",summary:"围绕文件系统、媒体能力和 WebView 的几项更新正在落地。",read:true},
      {source:"设计观察",time:"昨天",title:"为什么越来越多产品减少大标题",summary:"信息密度与视觉秩序之间的平衡，正在重新影响移动端界面。",read:false},
      {source:"影音速递",time:"昨天",title:"本周新片与纪录片更新",summary:"本周值得加入稍后观看列表的几部内容。",read:true}
    ];

    const tasks = [
      {icon:"⇩",title:"《剑来》全书章节缓存",state:"运行中",done:842,total:1268,time:"刚刚"},
      {icon:"⌕",title:"跨 18 个来源搜索「三体」",state:"运行中",done:13,total:18,time:"2 分钟前"},
      {icon:"↻",title:"检查内容库更新",state:"已暂停",done:24,total:42,time:"9 分钟前"},
      {icon:"⇩",title:"Podcast RSS 离线缓存",state:"已完成",done:18,total:18,time:"今天 19:22"}
    ];

    const bookmarks = [
      {title:"三体 · 第 72 章",note:"关于黑暗森林法则的这一段"},
      {title:"剑来 · 第 923 章",note:"这段山水描写留着以后再看"},
      {title:"晚安，陌生人 · 18:42",note:"关于睡眠的建议"}
    ];

    const replacementRules = [
      {name:"去除章节尾广告",scope:"正文",pattern:"本章未完.*$",enabled:true,subscription:false},
      {name:"净化作者求票",scope:"正文",pattern:"求月票.*$",enabled:true,subscription:true},
      {name:"统一空行",scope:"正文",pattern:"\\n{3,}",enabled:true,subscription:false},
      {name:"隐藏来源尾注",scope:"正文",pattern:"来自.*?书源",enabled:false,subscription:false}
    ];

    const tocRules = [
      {name:"中文章节",regex:"^\\s*第[一二三四五六七八九十百千万0-9]+[章节回].*$",enabled:true,builtin:true},
      {name:"Chapter N",regex:"^\\s*Chapter\\s+\\d+.*$",enabled:true,builtin:true},
      {name:"卷章组合",regex:"^\\s*第.+卷.+第.+章.*$",enabled:true,builtin:false},
      {name:"数字标题",regex:"^\\s*\\d{1,5}[.、 ].+$",enabled:false,builtin:false}
    ];

    const ttsConfigs = [
      {name:"Edge TTS · zh-CN",url:"https://tts.example.com/edge",enabled:true},
      {name:"自建 Azure TTS",url:"https://tts.example.com/azure",enabled:true},
      {name:"旧测试源",url:"https://tts.example.com/old",enabled:false}
    ];

    const configSections = ref([
      {title:"今日热门",source:"源仓 · 小说源 A",category:"热门",style:"横向封面"},
      {title:"漫画追更",source:"MangaHub",category:"最新",style:"四列网格"},
      {title:"高分视频",source:"StreamSource CN",category:"热门",style:"横向封面"},
      {title:"睡前听",source:"Podcast RSS",category:"推荐",style:"榜单"}
    ]);

    const importTypes = [
      {icon:"T",ext:"TXT",desc:"自动识别章节目录"},
      {icon:"E",ext:"EPUB",desc:"保留目录、封面和元数据"},
      {icon:"C",ext:"CBZ",desc:"漫画压缩包"},
      {icon:"P",ext:"PDF",desc:"PDF 文档阅读"}
    ];

    const heatmap = Array.from({length:91},(_,i)=>((i*7+i%5)%5));
    const readerParagraphs = [
      "夜色从远处一点点漫过来，山脊只剩下淡淡的轮廓。风穿过树梢，声音很轻，却把院子里最后一点暑气也带走了。",
      "他把手里的书合上，想起白天那些没来得及说出口的话。很多时候，人并不是不知道答案，只是还没准备好承认答案。",
      "窗外有车灯经过，光线在墙上晃了一下。桌上的水已经凉了，他却没有起身，只是继续听着远处若有若无的虫鸣。",
      "有些事情只有走得足够远以后才能看清。那时候再回头，曾经以为无法跨过去的地方，也不过是路上的一个转弯。",
      "第二天清晨，太阳照进房间的时候，他终于做出了决定。"
    ];

    const readerDirectory = Array.from({length:18},(_,i)=>`第 ${i+918} 章 · ${["山水之间","长夜","归途","旧事","风雪客","远行"][i%6]}`);

    const sourceCandidates = [
      {name:"源仓 · 线路 A",author:"作者一致",latest:"更新至最新",speed:"响应 410ms"},
      {name:"阅读源 · 线路 B",author:"作者一致",latest:"少 2 章",speed:"响应 280ms"},
      {name:"聚合源 · 线路 C",author:"需确认作者",latest:"更新至最新",speed:"响应 690ms"}
    ];

    const discoverItems = computed(() => items.filter(item =>
      discoverCategory.value === "all" || item.type === discoverCategory.value
    ));

    const libraryItems = computed(() => items.filter(item =>
      libraryIds.has(item.id) && (libraryCategory.value === "all" || item.type === libraryCategory.value)
    ));

    const filteredSources = computed(() => {
      const q = sourceQuery.value.trim().toLowerCase();
      return sourceRows.value.filter(s => !q || (s.name+" "+s.group+" "+s.kind).toLowerCase().includes(q));
    });

    const catalogLabel = computed(() => {
      if (!selected.value) return "目录";
      return selected.value.type === "video" ? "剧集" : selected.value.type === "audio" ? "节目" : "目录";
    });

    const primaryAction = computed(() => {
      if (!selected.value) return "打开";
      if (selected.value.type === "video") return "继续观看";
      if (selected.value.type === "audio") return "继续收听";
      return "继续阅读";
    });

    const progressLabel = computed(() => {
      if (!selected.value) return "进度";
      if (selected.value.type === "video") return "观看进度";
      if (selected.value.type === "audio") return "收听进度";
      return "阅读进度";
    });

    const chapterRows = computed(() => {
      if (!selected.value) return [];
      const type = selected.value.type;
      const count = type === "video" ? 18 : type === "audio" ? 18 : type === "comic" ? 24 : 28;
      const current = Math.max(2, Math.floor(count * .58));
      return Array.from({length:count}, (_,i) => {
        const n = count - i;
        const title = type === "video"
          ? `第 ${n} 集 · ${["回到山里","旧友重逢","风从院子里吹过","夜路","山野之间"][n%5]}`
          : type === "audio"
            ? `EP.${String(n+100).padStart(3,"0")} · ${["留一点安静","雨停之后","夜间列车","今天也辛苦了","睡前来信"][n%5]}`
            : type === "comic"
              ? `第 ${n} 话 · ${["灯下","各自的答案","夏日","回声","向前一步"][n%5]}`
              : `第 ${n+900} 章 · ${["山水之间","长夜","归途","旧事","风雪客"][n%5]}`;
        return {
          index:i,
          title,
          current:i===current,
          cached:i%3!==0,
          duration:type==="video" ? `${38+n%9} 分钟` : type==="audio" ? `${24+n%22} 分钟` : ""
        };
      }).filter(row => !catalogQuery.value.trim() || row.title.toLowerCase().includes(catalogQuery.value.trim().toLowerCase()));
    });

    const readerChapterTitle = computed(() => {
      if (readerMode.value === "video") return "第 18 集 · 山野之间";
      if (readerMode.value === "audio") return "EP.121 · 今天也辛苦了";
      if (readerMode.value === "comic") return "第 61 话 · 夏日";
      if (readerMode.value === "pdf") return "第 23 页";
      return "第 923 章 · 山水之间";
    });

    const readerPanelTitle = computed(() => {
      if (readerPanel.value === "directory") return readerMode.value === "video" ? "剧集" : readerMode.value === "audio" ? "节目" : "章节目录";
      if (readerPanel.value === "tts") return readerMode.value === "audio" || readerMode.value === "video" ? "播放" : "朗读";
      if (readerPanel.value === "appearance") return "界面";
      return "阅读设置";
    });

    function navIcon(key, active) {
      if (key === "discover") {
        return active
          ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M15.9 8.1 13.35 13.35 8.1 15.9l2.55-5.25L15.9 8.1Z" fill="white"/><circle cx="12" cy="12" r="1.15" fill="currentColor"/></svg>'
          : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15.9 8.1 13.35 13.35 8.1 15.9l2.55-5.25L15.9 8.1Z" fill="currentColor"/></svg>';
      }
      if (key === "library") {
        return '<svg viewBox="0 0 24 24"><path d="M3.5 7.8h6.1l1.6 2h9.3v8.7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M3.5 10h17" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
      }
      return '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.2" r="3.25" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.7 19.1c.65-3.2 3-5 6.3-5s5.65 1.8 6.3 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
    }

    function go(next) {
      detailOpen.value = false;
      sourceSwitchOpen.value = false;
      detailMenuOpen.value = false;
      modal.value = null;
      screen.value = next;
      prototypeMapOpen.value = false;
      window.scrollTo(0,0);
    }

    function goMain(nextTab) {
      screen.value = "main";
      tab.value = nextTab;
      detailOpen.value = false;
      modal.value = null;
      prototypeMapOpen.value = false;
      window.scrollTo(0,0);
    }

    function openDetail(item) {
      selected.value = item;
      detailTab.value = "info";
      detailMenuOpen.value = false;
      sourceSwitchOpen.value = false;
      catalogQuery.value = "";
      detailOpen.value = true;
    }

    function closeDetail() {
      detailOpen.value = false;
      sourceSwitchOpen.value = false;
      detailMenuOpen.value = false;
      catalogQuery.value = "";
    }

    function inLibrary(item) {
      return !!item && libraryIds.has(item.id);
    }

    function startReader(type) {
      if (!selected.value) selected.value = items[0];
      readerMode.value = type === "novel" ? "novel" : type;
      if (readerMode.value === "comic" && selected.value?.type !== "comic") selected.value = items.find(x=>x.type==="comic");
      if (readerMode.value === "video" && selected.value?.type !== "video") selected.value = items.find(x=>x.type==="video");
      if (readerMode.value === "audio" && selected.value?.type !== "audio") selected.value = items.find(x=>x.type==="audio");
      detailOpen.value = false;
      readerPanel.value = null;
      screen.value = "reader";
      prototypeMapOpen.value = false;
    }

    function openReaderPreview(mode) {
      if (mode === "novel") selected.value = items.find(x=>x.type==="novel");
      if (mode === "comic") selected.value = items.find(x=>x.type==="comic");
      if (mode === "video") selected.value = items.find(x=>x.type==="video");
      if (mode === "audio") selected.value = items.find(x=>x.type==="audio");
      if (mode === "pdf") selected.value = items.find(x=>x.id==="threebody");
      readerMode.value = mode;
      readerPanel.value = null;
      screen.value = "reader";
      prototypeMapOpen.value = false;
    }

    return {
      screen,tab,discoverCategory,libraryCategory,search,searchWasRun,selected,detailOpen,detailTab,detailMenuOpen,
      sourceSwitchOpen,catalogQuery,prototypeMapOpen,modal,activeSource,activeRule,activeToc,activeTts,activeArticle,
      sourceQuery,historyPeriod,historyTab,readerMode,readerPanel,
      labels,categories,items,navItems,sourceRows,articles,tasks,bookmarks,replacementRules,tocRules,ttsConfigs,configSections,
      importTypes,heatmap,readerParagraphs,readerDirectory,sourceCandidates,
      discoverItems,libraryItems,filteredSources,catalogLabel,primaryAction,progressLabel,chapterRows,readerChapterTitle,readerPanelTitle,
      navIcon,go,goMain,openDetail,closeDetail,inLibrary,startReader,openReaderPreview
    };
  }
}).mount("#app");