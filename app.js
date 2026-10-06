
const { createApp, computed, ref } = Vue;

createApp({
  setup() {
    const screen = ref("main");
    const tab = ref("discover");
    const discoverCategory = ref("all");
    const libraryCategory = ref("all");
    const query = ref("");
    const searchType = ref("all");
    const sourceQuery = ref("");
    const selected = ref(null);
    const detailTab = ref("overview");
    const detailReturnScreen = ref("main");
    const detailReturnTab = ref("discover");
    const catalogQuery = ref("");
    const readerMode = ref("novel");
    const readerPanel = ref(null);
    const mediaSpeed = ref("1.0");
    const videoQuality = ref("1080P");
    const subtitlesOn = ref(true);
    const comicMode = ref("vertical");
    const comicFit = ref("width");
    const readerBrightness = ref(88);
    const sleepTimer = ref("关闭");
    const novelSearch = ref("");
    const reviewOpen = ref(false);
    const modal = ref(null);
    const activeArticle = ref(null);
    const historyPeriod = ref("30 天");

    const labels = { novel:"小说", comic:"漫画", video:"视频", audio:"音频", article:"文章" };
    const categories = [
      {value:"all",label:"全部"},
      {value:"novel",label:"小说"},
      {value:"comic",label:"漫画"},
      {value:"video",label:"视频"},
      {value:"audio",label:"音频"}
    ];

    const primaryNav = [
      {key:"discover",label:"发现",icon:"compass"},
      {key:"library",label:"内容库",icon:"library"},
      {key:"me",label:"我的",icon:"user"}
    ];

    const items = [
      {id:"jianlai",type:"novel",title:"剑来",author:"烽火戏诸侯",meta:"玄幻 · 连载",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=86",kind:"玄幻",wordCount:"1168 万字",chapterCount:1268,latestChapter:"第 1268 章 人间有风雪",sourceName:"源仓 · 小说源 A",sourceGroup:"网络小说",progress:"第 923 章 · 73%",progressPct:73,intro:"天地之间，有个少年背着剑一路远行。山水、江湖、人心和选择，最终都落到脚下这一条路上。"},
      {id:"youth",type:"comic",title:"我的青春恋爱物语",author:"渡航 / 漫画版",meta:"校园 · 青春",img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=86",kind:"漫画",wordCount:"84 话",chapterCount:84,latestChapter:"第 84 话 于是，季节继续向前",sourceName:"MangaHub",sourceGroup:"漫画",progress:"第 61 话 · 72%",progressPct:72,intro:"把“正确答案”当作唯一出口的青春，往往会留下更多难以言说的东西。"},
      {id:"wind",type:"video",title:"去有风的地方",author:"华策影视",meta:"治愈 · 8.9 分",img:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=86",kind:"剧集",wordCount:"40 集",chapterCount:40,latestChapter:"第 40 集",sourceName:"StreamSource CN",sourceGroup:"视频",progress:"第 18 集 · 23:14",progressPct:46,intro:"在慢下来的生活里重新理解关系、选择与自己。"},
      {id:"threebody",type:"novel",title:"三体",author:"刘慈欣",meta:"科幻 · 完结",img:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=86",kind:"科幻",wordCount:"约 88 万字",chapterCount:188,latestChapter:"第三部 · 死神永生",sourceName:"本地 EPUB",sourceGroup:"本地",progress:"第 72 章 · 41%",progressPct:41,intro:"从一次秘密工程开始，人类文明被卷入一场跨越星际的长期博弈。"},
      {id:"oshi",type:"comic",title:"我推的孩子",author:"赤坂明 × 横枪萌果",meta:"演艺圈 · 连载",img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=86",kind:"漫画",wordCount:"166 话",chapterCount:166,latestChapter:"第 166 话 星",sourceName:"ComicSource JP",sourceGroup:"漫画",progress:"第 143 话 · 86%",progressPct:86,intro:"聚光灯越明亮，影子就越清晰。"},
      {id:"goodnight",type:"audio",title:"晚安，陌生人",author:"深夜电台",meta:"播客 · 治愈",img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=86",kind:"播客",wordCount:"128 期",chapterCount:128,latestChapter:"EP.128 明天也会有风",sourceName:"Podcast RSS",sourceGroup:"音频",progress:"EP.121 · 18:42",progressPct:44,intro:"给还没睡的人留一盏灯。每一期都是独立节目，也可以从任意一集开始。"},
      {id:"suzume",type:"video",title:"铃芽之旅",author:"新海诚",meta:"动画 · 121 分钟",img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86",kind:"电影",wordCount:"121 分钟",chapterCount:1,latestChapter:"正片",sourceName:"Anime Stream",sourceGroup:"视频",progress:"正片 · 38:12",progressPct:32,intro:"门的另一侧，是被遗忘的地方。"},
      {id:"mysteries",type:"novel",title:"诡秘之主",author:"爱潜水的乌贼",meta:"奇幻 · 完结",img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=86",kind:"奇幻",wordCount:"446 万字",chapterCount:1432,latestChapter:"第 1432 章 新的旅程",sourceName:"Legado Source",sourceGroup:"网络小说",progress:"第 602 章 · 42%",progressPct:42,intro:"蒸汽、机械、教会与未知存在交织成一张巨大的网。"},
      {id:"catnoise",type:"audio",title:"猫的白噪音",author:"睡眠实验室",meta:"白噪音 · 助眠",img:"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=86",kind:"白噪音",wordCount:"36 轨",chapterCount:36,latestChapter:"36 · 午后窗边",sourceName:"Local Audio",sourceGroup:"本地音频",progress:"12 · 雨夜 · 22:10",progressPct:58,intro:"把猫的呼吸、窗外的雨和房间里微小的声音留在夜里。"},
      {id:"blade",type:"comic",title:"镖人",author:"许先哲",meta:"国漫 · 武侠",img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86",kind:"国漫",wordCount:"112 话",chapterCount:112,latestChapter:"第 112 话",sourceName:"本地 CBZ",sourceGroup:"本地",progress:"第 94 话 · 84%",progressPct:84,intro:"大漠、镖客与乱世里的人。"}
    ];

    const libraryIds = new Set(["jianlai","threebody","goodnight","suzume","mysteries","blade"]);

    const sourceRows = ref([
      {id:"s1",name:"源仓 · 小说源 A",kind:"小说",group:"网络小说",enabled:true,url:"https://source-a.example.com"},
      {id:"s2",name:"MangaHub",kind:"漫画",group:"漫画",enabled:true,url:"https://manga.example.com"},
      {id:"s3",name:"StreamSource CN",kind:"视频",group:"视频",enabled:true,url:"https://video.example.com"},
      {id:"s4",name:"Podcast RSS",kind:"音频",group:"音频",enabled:true,url:"https://audio.example.com/feed.xml"},
      {id:"s5",name:"Tech Weekly",kind:"文章",group:"订阅",enabled:true,url:"https://rss.example.com"},
      {id:"s6",name:"Old Book Source",kind:"小说",group:"备用",enabled:false,url:"https://old.example.com"},
      {id:"s7",name:"Comic Mirror",kind:"漫画",group:"备用",enabled:false,url:"https://comic-mirror.example.com"},
      {id:"s8",name:"Documentary World",kind:"视频",group:"视频",enabled:true,url:"https://doc.example.com"}
    ]);
    const selectedSource = ref(sourceRows.value[0]);

    const articles = [
      {source:"科技周刊",time:"2 小时前",title:"这一周值得关注的开源项目",summary:"从跨平台桌面应用到新的编译工具链，本周有不少值得收藏的项目。",read:false},
      {source:"开发者资讯",time:"5 小时前",title:"浏览器端新 API 的几项变化",summary:"围绕文件系统、媒体能力和 WebView 的几项更新正在落地。",read:true},
      {source:"设计观察",time:"昨天",title:"为什么越来越多产品减少大标题",summary:"信息密度与视觉秩序之间的平衡，正在重新影响移动端界面。",read:false},
      {source:"影音速递",time:"昨天",title:"本周新片与纪录片更新",summary:"本周值得加入稍后观看列表的几部内容。",read:true}
    ];
    const feeds = ["科技周刊","开发者资讯","设计观察","影音速递"];

    const tasks = [
      {icon:"download",title:"《剑来》离线缓存",state:"运行中",done:842,total:1268,time:"刚刚"},
      {icon:"search",title:"跨 18 个来源搜索「三体」",state:"运行中",done:13,total:18,time:"2 分钟前"},
      {icon:"refresh",title:"检查内容库更新",state:"已暂停",done:24,total:42,time:"9 分钟前"},
      {icon:"audio",title:"Podcast RSS 离线缓存",state:"已完成",done:18,total:18,time:"今天 19:22"}
    ];

    const groups = [
      {name:"稍后看",count:5},{name:"长篇小说",count:4},{name:"漫画追更",count:3},{name:"睡前听",count:4},{name:"纪录片",count:2}
    ];

    const importTypes = [
      {icon:"text",ext:"TXT",desc:"纯文本与自动目录"},
      {icon:"book",ext:"EPUB",desc:"电子书与元数据"},
      {icon:"image",ext:"CBZ",desc:"漫画压缩包"},
      {icon:"pdf",ext:"PDF",desc:"文档阅读"}
    ];

    const recentQueries = ["三体","有声书","异世界","纪录片","新海诚","白噪音"];
    const periods = ["今天","7 天","30 天","全部"];
    const historyItems = computed(() => items.filter(i => libraryIds.has(i.id)).slice(0,5));

    const bookmarkGroups = [
      {title:"三体",cover:items[3].img,items:[{anchor:"第 72 章",note:"黑暗森林法则",time:"昨天 22:14"},{anchor:"第 89 章",note:"这段重新看",time:"9 月 28 日"}]},
      {title:"剑来",cover:items[0].img,items:[{anchor:"第 923 章",note:"山水描写",time:"今天 18:02"},{anchor:"第 1001 章",note:"关于选择",time:"9 月 30 日"}]},
      {title:"晚安，陌生人",cover:items[5].img,items:[{anchor:"18:42",note:"关于睡眠的建议",time:"10 月 3 日"}]}
    ];

    const replacementRules = ref([
      {name:"去除章节尾广告",scope:"正文",pattern:"本章未完.*$",enabled:true,subscription:false},
      {name:"净化作者求票",scope:"正文",pattern:"求月票.*$",enabled:true,subscription:true},
      {name:"统一空行",scope:"正文",pattern:"\\n{3,}",enabled:true,subscription:false},
      {name:"隐藏来源尾注",scope:"正文",pattern:"来自.*?书源",enabled:false,subscription:false}
    ]);
    const selectedRule = ref(replacementRules.value[0]);

    const tocRules = ref([
      {name:"中文章节",regex:"^\\s*第[一二三四五六七八九十百千万0-9]+[章节回].*$",enabled:true},
      {name:"Chapter N",regex:"^\\s*Chapter\\s+\\d+.*$",enabled:true},
      {name:"卷章组合",regex:"^\\s*第.+卷.+第.+章.*$",enabled:true},
      {name:"数字标题",regex:"^\\s*\\d{1,5}[.、 ].+$",enabled:false}
    ]);
    const selectedToc = ref(tocRules.value[0]);

    const ttsConfigs = ref([
      {name:"Edge TTS · zh-CN",url:"https://tts.example.com/edge",enabled:true},
      {name:"自建 Azure TTS",url:"https://tts.example.com/azure",enabled:true},
      {name:"旧测试源",url:"https://tts.example.com/old",enabled:false}
    ]);
    const selectedTts = ref(ttsConfigs.value[0]);

    const configSections = ref([
      {title:"今日热门",source:"源仓 · 小说源 A",category:"热门",style:"封面流"},
      {title:"漫画追更",source:"MangaHub",category:"最新",style:"横向滚动"},
      {title:"高分视频",source:"StreamSource CN",category:"热门",style:"封面流"},
      {title:"睡前听",source:"Podcast RSS",category:"推荐",style:"紧凑列表"}
    ]);

    const sourceCandidates = [
      {name:"源仓 · 线路 A",author:"作者一致",latest:"更新至最新",speed:"响应 410ms"},
      {name:"阅读源 · 线路 B",author:"作者一致",latest:"少 2 章",speed:"响应 280ms"},
      {name:"聚合源 · 线路 C",author:"需确认作者",latest:"更新至最新",speed:"响应 690ms"}
    ];

    const readerParagraphs = [
      "夜色从远处一点点漫过来，山脊只剩下淡淡的轮廓。风穿过树梢，声音很轻，却把院子里最后一点暑气也带走了。",
      "他把手里的书合上，想起白天那些没来得及说出口的话。很多时候，人并不是不知道答案，只是还没准备好承认答案。",
      "窗外有车灯经过，光线在墙上晃了一下。桌上的水已经凉了，他却没有起身，只是继续听着远处若有若无的虫鸣。",
      "有些事情只有走得足够远以后才能看清。那时候再回头，曾经以为无法跨过去的地方，也不过是路上的一个转弯。",
      "第二天清晨，太阳照进房间的时候，他终于做出了决定。"
    ];
    const readerDirectory = Array.from({length:18},(_,i) => "第 " + (i+918) + " 章 · " + ["山水之间","长夜","归途","旧事","风雪客","远行"][i%6]);

    const discoverItems = computed(() => items.filter(i => discoverCategory.value==="all" || i.type===discoverCategory.value));
    const libraryItems = computed(() => items.filter(i => libraryIds.has(i.id) && (libraryCategory.value==="all" || i.type===libraryCategory.value)));
    const searchResults = computed(() => {
      const q = query.value.trim().toLowerCase();
      return items.filter(i => (searchType.value==="all" || i.type===searchType.value) && (!q || (i.title+" "+i.author+" "+i.meta).toLowerCase().includes(q)));
    });
    const filteredSources = computed(() => {
      const q = sourceQuery.value.trim().toLowerCase();
      return sourceRows.value.filter(s => !q || (s.name+" "+s.kind+" "+s.group).toLowerCase().includes(q));
    });

    const catalogLabel = computed(() => !selected.value ? "目录" : selected.value.type==="video" ? "剧集" : selected.value.type==="audio" ? "节目" : "目录");
    const primaryAction = computed(() => !selected.value ? "打开" : selected.value.type==="video" ? "继续观看" : selected.value.type==="audio" ? "继续收听" : "继续阅读");
    const progressLabel = computed(() => !selected.value ? "进度" : selected.value.type==="video" ? "观看进度" : selected.value.type==="audio" ? "收听进度" : "阅读进度");

    const chapterRows = computed(() => {
      if (!selected.value) return [];
      const type = selected.value.type;
      const count = type==="video" ? 18 : type==="audio" ? 18 : type==="comic" ? 24 : 28;
      const current = Math.max(2,Math.floor(count*.58));
      return Array.from({length:count},(_,i)=>{
        const n=count-i;
        let title;
        if (type==="video") title="第 "+n+" 集 · "+["回到山里","旧友重逢","风从院子里吹过","夜路","山野之间"][n%5];
        else if (type==="audio") title="EP."+String(n+100).padStart(3,"0")+" · "+["留一点安静","雨停之后","夜间列车","今天也辛苦了","睡前来信"][n%5];
        else if (type==="comic") title="第 "+n+" 话 · "+["灯下","各自的答案","夏日","回声","向前一步"][n%5];
        else title="第 "+(n+900)+" 章 · "+["山水之间","长夜","归途","旧事","风雪客"][n%5];
        return {index:i,title,current:i===current,cached:i%3!==0,duration:type==="video"?(38+n%9)+" 分钟":type==="audio"?(24+n%22)+" 分钟":""};
      }).filter(c => !catalogQuery.value.trim() || c.title.includes(catalogQuery.value.trim()));
    });

    const readerChapterTitle = computed(() => readerMode.value==="video" ? "第 18 集 · 山野之间" : readerMode.value==="audio" ? "EP.121 · 今天也辛苦了" : readerMode.value==="comic" ? "第 61 话 · 夏日" : readerMode.value==="pdf" ? "第 23 页" : "第 923 章 · 山水之间");
    const readerPanelTitle = computed(() => {
      const titles = {
        directory: catalogLabel.value,
        tts: "朗读",
        appearance: "显示",
        bookmark: "书签",
        "novel-search": "本章搜索",
        "comic-chapters": "选话",
        "comic-mode": "阅读模式",
        "comic-fit": "图片适配",
        "comic-brightness": "亮度",
        "video-episodes": "选集",
        "audio-episodes": "节目列表",
        "audio-speed": "播放速度",
        "audio-sleep": "睡眠定时",
        "pdf-pages": "页面",
        "pdf-display": "PDF 显示",
        "pdf-search": "文档搜索"
      };
      return titles[readerPanel.value] || "";
    });

    const paths = {
      compass:'<circle cx="12" cy="12" r="8.6"/><path d="m15.6 8.4-2.2 5-5 2.2 2.2-5 5-2.2Z"/><circle cx="12" cy="12" r="1"/>',
      library:'<path d="M4 6.7h5l1.5 1.8H20v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.7Z"/><path d="M4 10h16"/>',
      user:'<circle cx="12" cy="8.2" r="3.1"/><path d="M5.7 19c.7-3.1 3-4.8 6.3-4.8s5.6 1.7 6.3 4.8"/>',
      search:'<circle cx="10.7" cy="10.7" r="5.9"/><path d="m15.2 15.2 4.4 4.4"/>',
      rss:'<path d="M5 5.5a13.5 13.5 0 0 1 13.5 13.5"/><path d="M5 10.5a8.5 8.5 0 0 1 8.5 8.5"/><circle cx="5.2" cy="18.8" r="1.3" fill="currentColor" stroke="none"/>',
      history:'<path d="M4.5 8.2V4.5h3.7"/><path d="M5.3 6.2A8 8 0 1 1 4.6 16"/><path d="M12 8v4.4l3 1.8"/>',
      bookmark:'<path d="M7 4.5h10v15l-5-3.2-5 3.2v-15Z"/>',
      download:'<path d="M12 4v10"/><path d="m8.2 10.4 3.8 3.8 3.8-3.8"/><path d="M5 19h14"/>',
      source:'<circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="12" r="7.2"/><path d="M12 2.8v2M21.2 12h-2M12 21.2v-2M2.8 12h2"/>',
      appearance:'<path d="M4 6h16M7 12h10M10 18h4"/><circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none"/>',
      backup:'<path d="M6.2 8.2A6.7 6.7 0 1 1 5.5 16"/><path d="M4 8.2h4.2V4"/><path d="M12 8v4.5l3 1.7"/>',
      settings:'<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"/>',
      'chevron-right':'<path d="m9 6 6 6-6 6"/>',
      'arrow-left':'<path d="m14.5 5-7 7 7 7"/>',
      close:'<path d="m7 7 10 10M17 7 7 17"/>',
      more:'<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
      filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',
      import:'<path d="M12 20V10"/><path d="m8 13.5 4-4 4 4"/><path d="M5 5h14"/>',
      export:'<path d="M12 4v10"/><path d="m8 8 4-4 4 4"/><path d="M5 19h14"/>',
      tune:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
      plus:'<path d="M12 5v14M5 12h14"/>',
      text:'<path d="M6 5h12M12 5v14M8.5 19h7"/>',
      book:'<path d="M5 4.5h5.5A2.5 2.5 0 0 1 13 7v12H7.5A2.5 2.5 0 0 1 5 16.5v-12Z"/><path d="M19 4.5h-3.5A2.5 2.5 0 0 0 13 7v12h3.5a2.5 2.5 0 0 0 2.5-2.5v-12Z"/>',
      image:'<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m6 17 4.5-4.5 3 3 2-2L19 17"/>',
      pdf:'<path d="M7 3.5h7l4 4V20H7z"/><path d="M14 3.5V8h4"/><path d="M9.5 14h5M9.5 17h4"/>',
      refresh:'<path d="M19 7V3.8l-2.2 2.1A7.5 7.5 0 1 0 19 16"/>',
      play:'<path d="m9 6 9 6-9 6V6Z"/>',
      pause:'<path d="M9 7v10M15 7v10"/>',
      audio:'<path d="M9 18V6l9-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="15.5" cy="16" r="2.5"/>',
      debug:'<path d="M8 8h8v8a4 4 0 0 1-8 0V8Z"/><path d="M9 5l2 3M15 5l-2 3M5 12h3M16 12h3M5 16h3M16 16h3"/>',
      login:'<path d="M11 5H6v14h5"/><path d="M10 12h9M16 9l3 3-3 3"/>',
      edit:'<path d="m5 16-.8 3.8L8 19l9.5-9.5-3-3L5 16Z"/><path d="m13.8 7.2 3 3"/>',
      trash:'<path d="M5 7h14M9 7V4.5h6V7M7 7l1 13h8l1-13M10 10v6M14 10v6"/>',
      info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
      list:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="5" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="18" r="1" fill="currentColor" stroke="none"/>',
      file:'<path d="M7 3.5h7l4 4V20H7z"/><path d="M14 3.5V8h4"/>',
      rule:'<path d="M5 7h14M5 12h9M5 17h14"/><circle cx="17" cy="12" r="2"/>',
      layout:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
      cache:'<path d="M6 7c0-2 2.7-3.5 6-3.5S18 5 18 7s-2.7 3.5-6 3.5S6 9 6 7Z"/><path d="M6 7v5c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5V7M6 12v5c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5v-5"/>',
      network:'<circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.2 5.1 3.2 8.5S14.2 18.2 12 20.5C9.8 18.2 8.8 15.4 8.8 12S9.8 5.8 12 3.5Z"/>',
      tts:'<path d="M5 10v4h3l4 3V7L8 10H5Z"/><path d="M15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11"/>',
      cloud:'<path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6.2 8.6 4.7 4.7 0 0 0 7 18Z"/>',
      speaker:'<path d="M5 10v4h3l4 3V7L8 10H5Z"/><path d="M15 10a3 3 0 0 1 0 4"/>',
      link:'<path d="m9.5 14.5 5-5"/><path d="M7.2 16.8 5.7 18.3a3 3 0 0 1-4.2-4.2l3.2-3.2a3 3 0 0 1 4.2 0M16.8 7.2l1.5-1.5a3 3 0 0 1 4.2 4.2l-3.2 3.2a3 3 0 0 1-4.2 0"/>',
      'book-open':'<path d="M5 5h5.5A2.5 2.5 0 0 1 13 7.5V19H7.5A2.5 2.5 0 0 1 5 16.5V5Z"/><path d="M19 5h-3.5A2.5 2.5 0 0 0 13 7.5V19h3.5a2.5 2.5 0 0 0 2.5-2.5V5Z"/>',
      'source-switch':'<path d="M7 7h10l-2.5-2.5M17 17H7l2.5 2.5"/><path d="m17 7 2 2-2 2M7 17l-2-2 2-2"/>',
      fullscreen:'<path d="M8 4H4v4M16 4h4v4M20 16v4h-4M4 16v4h4"/>',
      sun:'<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
      moon:'<path d="M18.2 16.6A7.5 7.5 0 0 1 7.4 5.8 8 8 0 1 0 18.2 16.6Z"/>',
      back15:'<path d="M7 7H4V4"/><path d="M5 6.5A8 8 0 1 1 4.8 17"/><path d="M10 10v5M13 10.5c2-1 3.5.1 3.5 1.4 0 1.8-3.5 3.1-3.5 3.1h4"/>',
      forward15:'<path d="M17 7h3V4"/><path d="M19 6.5A8 8 0 1 0 19.2 17"/><path d="M8 10v5M11 10.5c2-1 3.5.1 3.5 1.4 0 1.8-3.5 3.1-3.5 3.1h4"/>'
    };

    function icon(name) {
      const body = paths[name] || paths.file;
      return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
    }

    function sourceKindIcon(kind) {
      if (kind==="漫画") return "image";
      if (kind==="视频") return "play";
      if (kind==="音频") return "audio";
      if (kind==="文章") return "rss";
      return "book";
    }

    function go(next) {
      screen.value = next;
      reviewOpen.value = false;
      modal.value = null;
      window.scrollTo(0,0);
    }

    function backToMain(nextTab) {
      screen.value = "main";
      tab.value = nextTab;
      reviewOpen.value = false;
      modal.value = null;
      window.scrollTo(0,0);
    }

    function openDetail(item) {
      detailReturnScreen.value = screen.value;
      detailReturnTab.value = tab.value;
      selected.value = item;
      detailTab.value = "overview";
      catalogQuery.value = "";
      screen.value = "detail";
      reviewOpen.value = false;
      window.scrollTo(0,0);
    }

    function returnFromDetail() {
      screen.value = detailReturnScreen.value;
      if (screen.value==="main") tab.value = detailReturnTab.value;
      window.scrollTo(0,0);
    }

    function startReader(type) {
      if (!selected.value) selected.value = items[0];
      readerMode.value = type;
      readerPanel.value = null;
      screen.value = "reader";
      reviewOpen.value = false;
    }

    function leaveReader() {
      screen.value = "detail";
      detailTab.value = "overview";
    }

    function previewDetail(type) {
      selected.value = items.find(i=>i.type===type) || items[0];
      detailReturnScreen.value = "main";
      detailReturnTab.value = "discover";
      detailTab.value = "overview";
      screen.value = "detail";
      reviewOpen.value = false;
    }

    function previewReader(mode) {
      if (mode==="pdf") selected.value = items.find(i=>i.id==="threebody");
      else selected.value = items.find(i=>i.type===mode) || items[0];
      readerMode.value = mode;
      readerPanel.value = null;
      screen.value = "reader";
      reviewOpen.value = false;
    }

    function newRule() {
      const r={name:"新规则",scope:"正文",pattern:"",enabled:true,subscription:false};
      replacementRules.value.unshift(r); selectedRule.value=r;
    }
    function newTocRule() {
      const r={name:"新目录规则",regex:"",enabled:true};
      tocRules.value.unshift(r); selectedToc.value=r;
    }
    function newTts() {
      const t={name:"新 HTTP TTS",url:"https://",enabled:true};
      ttsConfigs.value.unshift(t); selectedTts.value=t;
    }

    return {
      screen,tab,discoverCategory,libraryCategory,query,searchType,sourceQuery,selected,detailTab,catalogQuery,readerMode,readerPanel,mediaSpeed,videoQuality,subtitlesOn,comicMode,comicFit,readerBrightness,sleepTimer,novelSearch,reviewOpen,modal,activeArticle,historyPeriod,
      labels,categories,primaryNav,items,sourceRows,selectedSource,articles,feeds,tasks,groups,importTypes,recentQueries,periods,historyItems,bookmarkGroups,
      replacementRules,selectedRule,tocRules,selectedToc,ttsConfigs,selectedTts,configSections,sourceCandidates,readerParagraphs,readerDirectory,
      discoverItems,libraryItems,searchResults,filteredSources,catalogLabel,primaryAction,progressLabel,chapterRows,readerChapterTitle,readerPanelTitle,
      icon,sourceKindIcon,go,backToMain,openDetail,returnFromDetail,startReader,leaveReader,previewDetail,previewReader,newRule,newTocRule,newTts
    };
  },

  template: `
  <div class="product-shell" :class="{ immersive: screen==='reader' }">
    <aside v-if="screen==='main'" class="primary-rail">
      <nav>
        <button v-for="item in primaryNav" :key="item.key" :class="{active:tab===item.key}" @click="tab=item.key">
          <span class="icon" v-html="icon(item.icon)"></span><span>{{item.label}}</span>
        </button>
      </nav>
    </aside>

    <main v-if="screen==='main'" class="main-canvas">
      <section v-if="tab==='discover'" class="main-view">
        <div class="discover-command">
          <button class="search-launcher" @click="go('search')"><span class="icon" v-html="icon('search')"></span><span>搜索内容、作者、频道或来源</span><kbd>⌘ K</kbd></button>
          <button class="round-action" title="订阅文章" @click="go('articles')"><span class="icon" v-html="icon('rss')"></span></button>
        </div>
        <nav class="content-filter"><button v-for="c in categories" :key="c.value" :class="{active:discoverCategory===c.value}" @click="discoverCategory=c.value">{{c.label}}</button></nav>
        <div class="media-grid"><article v-for="item in discoverItems" :key="item.id" class="media-card"><button @click="openDetail(item)"><div class="media-cover"><img :src="item.img" :alt="item.title"></div><div class="media-copy"><strong>{{item.title}}</strong><span>{{item.author}}</span><small>{{labels[item.type]}} · {{item.meta}}</small></div></button></article></div>
      </section>

      <section v-else-if="tab==='library'" class="main-view">
        <div class="library-command"><nav class="content-filter library-filter"><button v-for="c in categories" :key="c.value" :class="{active:libraryCategory===c.value}" @click="libraryCategory=c.value">{{c.label}}</button></nav><div class="command-actions"><button class="round-action" title="导入" @click="go('import')"><span class="icon" v-html="icon('import')"></span></button><button class="round-action" title="整理内容库" @click="go('library-manage')"><span class="icon" v-html="icon('tune')"></span></button></div></div>
        <div class="media-grid"><article v-for="item in libraryItems" :key="item.id" class="media-card"><button @click="openDetail(item)"><div class="media-cover"><img :src="item.img" :alt="item.title"><span class="progress-line"><i :style="{width:item.progressPct+'%'}"></i></span></div><div class="media-copy"><strong>{{item.title}}</strong><span>{{item.author}}</span><small>{{item.progress}}</small></div></button></article></div>
      </section>

      <section v-else class="main-view me-redesign">
        <div class="me-shortcuts">
          <button @click="go('history')"><span class="shortcut-icon" v-html="icon('history')"></span><strong>历史</strong><small>最近看过</small></button>
          <button @click="go('bookmarks')"><span class="shortcut-icon" v-html="icon('bookmark')"></span><strong>书签</strong><small>保存的位置</small></button>
          <button @click="go('tasks')"><span class="shortcut-icon" v-html="icon('download')"></span><strong>下载</strong><small>离线与任务</small></button>
          <button @click="go('sources')"><span class="shortcut-icon" v-html="icon('source')"></span><strong>来源</strong><small>内容引擎</small></button>
        </div>
        <section class="me-group">
          <button class="me-row" @click="go('appearance')"><span class="row-icon" v-html="icon('appearance')"></span><span><strong>阅读与播放</strong><small>主题、字体、排版和媒体偏好</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button>
          <button class="me-row" @click="go('backup')"><span class="row-icon" v-html="icon('backup')"></span><span><strong>数据与同步</strong><small>备份、恢复和 WebDAV</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button>
          <button class="me-row" @click="go('settings')"><span class="row-icon" v-html="icon('settings')"></span><span><strong>高级设置</strong><small>规则、解析、网络、缓存和 TTS</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button>
        </section>
      </section>
    </main>

    <nav v-if="screen==='main'" class="mobile-nav"><button v-for="item in primaryNav" :key="item.key" :class="{active:tab===item.key}" @click="tab=item.key"><span class="icon" v-html="icon(item.icon)"></span><span>{{item.label}}</span></button></nav>

    <section v-if="screen==='search'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('discover')"><span class="icon" v-html="icon('arrow-left')"></span></button><label class="workspace-search"><span class="icon" v-html="icon('search')"></span><input v-model="query" autofocus placeholder="搜索书名、作者、关键词或来源"><button v-if="query" @click="query=''"><span class="icon" v-html="icon('close')"></span></button></label><button class="text-action">搜索</button></header>
      <div class="workspace-content search-redesign"><aside class="filter-column"><section><strong>类型</strong><button v-for="c in categories" :key="c.value" :class="{active:searchType===c.value}" @click="searchType=c.value">{{c.label}}</button></section><section><strong>来源范围</strong><label v-for="s in sourceRows.slice(0,6)" :key="s.id"><input type="checkbox" checked><span>{{s.name}}</span></label></section><section><strong>匹配</strong><select><option>智能匹配</option><option>标题精确</option><option>作者精确</option></select></section></aside><div class="search-result-pane"><div v-if="!query" class="search-suggestions"><p>最近搜索</p><button v-for="q in recentQueries" :key="q" @click="query=q">{{q}}</button></div><div class="result-list"><article v-for="item in searchResults" :key="item.id" @click="openDetail(item)"><img :src="item.img" alt=""><div><strong>{{item.title}}</strong><span>{{item.author}} · {{labels[item.type]}}</span><p>{{item.intro}}</p></div><span class="result-source">{{item.sourceName}}</span><button class="ghost-action">打开</button></article></div></div></div>
    </section>

    <section v-if="screen==='articles'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('discover')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>订阅</strong><small>来自 RSS 与文章来源</small></div><button class="icon-button"><span class="icon" v-html="icon('filter')"></span></button></header>
      <div class="workspace-content article-layout"><aside class="feed-column"><button class="active">全部</button><button>未读</button><button>收藏</button><hr><button v-for="feed in feeds" :key="feed">{{feed}}</button></aside><div class="article-column"><article v-for="a in articles" :key="a.title" @click="activeArticle=a;modal='article'"><small>{{a.source}} · {{a.time}}</small><strong>{{a.title}}</strong><p>{{a.summary}}</p><span v-if="!a.read" class="unread-dot"></span></article></div></div>
    </section>

    <section v-if="screen==='library-manage'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('library')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>整理内容库</strong><small>分组与批量管理</small></div><button class="text-action">完成</button></header>
      <div class="workspace-content library-manage-layout"><aside class="collection-sidebar"><button class="active"><span>全部内容</span><small>18</small></button><button v-for="g in groups" :key="g.name"><span>{{g.name}}</span><small>{{g.count}}</small></button><button class="add-collection"><span class="icon" v-html="icon('plus')"></span> 新建分组</button></aside><div class="library-manage-main"><div class="selection-bar"><label><input type="checkbox"> 全选</label><span>已选 3 项</span><div><button>移动到</button><button class="danger-text">移除</button></div></div><div class="manage-grid"><label v-for="item in libraryItems" :key="item.id"><input type="checkbox"><img :src="item.img" alt=""><strong>{{item.title}}</strong><small>{{item.author}}</small></label></div></div></div>
    </section>

    <section v-if="screen==='import'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('library')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>导入</strong><small>本地内容与配置</small></div></header>
      <div class="workspace-content narrow-page"><div class="import-grid"><button v-for="f in importTypes" :key="f.ext" @click="modal='import-progress'"><span class="file-icon" v-html="icon(f.icon)"></span><strong>{{f.ext}}</strong><small>{{f.desc}}</small></button></div><section class="link-import"><strong>通过链接导入</strong><small>可识别内容源、RSS、规则或分享链接</small><div><input placeholder="粘贴链接"><button class="primary-action">识别</button></div></section><section class="recent-imports"><strong>最近导入</strong><div><span>银河帝国.epub</span><small>EPUB · 昨天</small></div><div><span>漫画合集.cbz</span><small>CBZ · 2 天前</small></div></section></div>
    </section>

    <section v-if="screen==='history'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('me')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>历史</strong><small>最近消费过的内容</small></div><button class="icon-button"><span class="icon" v-html="icon('more')"></span></button></header>
      <div class="workspace-content history-redesign"><div class="time-filter"><button v-for="p in periods" :key="p" :class="{active:historyPeriod===p}" @click="historyPeriod=p">{{p}}</button></div><div class="history-summary"><span><strong>126h</strong><small>累计时长</small></span><span><strong>384</strong><small>打开次数</small></span><span><strong>42</strong><small>内容数</small></span></div><div class="history-timeline"><article v-for="(item,i) in historyItems" :key="item.id"><span class="timeline-time">{{['今天 20:14','今天 18:02','昨天','周六'][i%4]}}</span><img :src="item.img" alt=""><div><strong>{{item.title}}</strong><small>{{item.progress}}</small></div><button class="icon-button"><span class="icon" v-html="icon('more')"></span></button></article></div></div>
    </section>

    <section v-if="screen==='bookmarks'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('me')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>书签</strong><small>保存的章节、页面和时间点</small></div><button class="icon-button"><span class="icon" v-html="icon('search')"></span></button></header>
      <div class="workspace-content bookmark-redesign"><div class="bookmark-groups"><section v-for="group in bookmarkGroups" :key="group.title"><header><img :src="group.cover" alt=""><div><strong>{{group.title}}</strong><small>{{group.items.length}} 个书签</small></div></header><button v-for="b in group.items" :key="b.anchor"><span class="bookmark-anchor">{{b.anchor}}</span><span><strong>{{b.note}}</strong><small>{{b.time}}</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button></section></div></div>
    </section>

    <section v-if="screen==='tasks'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('me')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>下载与任务</strong><small>离线、更新、搜索和导入</small></div><button class="icon-button"><span class="icon" v-html="icon('more')"></span></button></header>
      <div class="workspace-content task-redesign"><div class="task-filter"><button class="active">全部</button><button>进行中</button><button>已完成</button><button>失败</button></div><article v-for="task in tasks" :key="task.title"><span class="task-type" v-html="icon(task.icon)"></span><div class="task-info"><strong>{{task.title}}</strong><small>{{task.state}} · {{task.done}} / {{task.total}}</small><span class="task-progress"><i :style="{width:(task.done/task.total*100)+'%'}"></i></span></div><small>{{task.time}}</small><button class="icon-button"><span class="icon" v-html="icon(task.state==='已暂停'?'play':'pause')"></span></button></article></div>
    </section>

    <section v-if="screen==='sources'" class="workspace full-workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('me')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>内容来源</strong><small>发现、搜索和获取内容的引擎</small></div><button class="primary-small" @click="modal='source-import'"><span class="icon" v-html="icon('plus')"></span> 添加来源</button></header>
      <div class="source-workbench"><aside class="source-master"><label class="mini-search"><span class="icon" v-html="icon('search')"></span><input v-model="sourceQuery" placeholder="搜索来源"></label><div class="source-filters"><button class="active">全部</button><button>启用</button><button>停用</button></div><button v-for="s in filteredSources" :key="s.id" class="source-master-row" :class="{active:selectedSource?.id===s.id}" @click="selectedSource=s"><span class="source-dot" :class="{off:!s.enabled}"></span><span><strong>{{s.name}}</strong><small>{{s.kind}} · {{s.group}}</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button></aside><main v-if="selectedSource" class="source-inspector"><div class="source-inspector-head"><div><span class="source-large-icon" v-html="icon(sourceKindIcon(selectedSource.kind))"></span><div><strong>{{selectedSource.name}}</strong><small>{{selectedSource.url}}</small></div></div><label class="switch"><input v-model="selectedSource.enabled" type="checkbox"><span></span></label></div><div class="source-inspector-actions"><button @click="modal='source-test'"><span class="icon" v-html="icon('debug')"></span> 测试</button><button @click="modal='source-login'"><span class="icon" v-html="icon('login')"></span> 登录</button><button @click="modal='source-edit'"><span class="icon" v-html="icon('edit')"></span> 编辑</button><button><span class="icon" v-html="icon('export')"></span> 导出</button></div><section class="inspector-section"><small>分类</small><div class="tag-row"><span>{{selectedSource.kind}}</span><span>{{selectedSource.group}}</span><span>{{selectedSource.enabled?'已启用':'已停用'}}</span></div></section><section class="inspector-section"><small>能力</small><div class="capability-grid"><span><i v-html="icon('search')"></i>搜索</span><span><i v-html="icon('info')"></i>详情</span><span><i v-html="icon('list')"></i>目录</span><span><i v-html="icon('file')"></i>正文</span></div></section><section class="inspector-section"><small>运行状态</small><div class="health-card"><span class="health-dot"></span><div><strong>最近请求正常</strong><small>平均响应 380 ms · 5 分钟前检查</small></div><button @click="modal='source-test'">重新测试</button></div></section><button class="danger-row"><span class="icon" v-html="icon('trash')"></span> 删除这个来源</button></main></div>
    </section>

    <section v-if="screen==='appearance'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('me')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>阅读与播放</strong><small>消费内容时的显示和行为</small></div></header>
      <div class="workspace-content appearance-layout"><aside class="appearance-preview"><div class="preview-device"><small>第 23 章</small><strong>山水之间</strong><p>夜色从远处一点点漫过来，山脊只剩下淡淡的轮廓。风穿过树梢，声音很轻。</p><p>很多时候，人并不是不知道答案，只是还没准备好承认答案。</p></div></aside><main class="settings-stack"><section><h3>文字</h3><label><span><strong>字号</strong><small>正文显示大小</small></span><input type="range" min="12" max="36" value="18"><b>18</b></label><label><span><strong>行距</strong><small>段落阅读密度</small></span><input type="range" min="1.2" max="2.8" step=".1" value="1.8"><b>1.8</b></label><label><span><strong>字体</strong><small>仅影响显示</small></span><select><option>系统字体</option><option>衬线字体</option><option>无衬线字体</option></select></label></section><section><h3>主题</h3><div class="theme-cards"><button class="active"><i class="paper"></i><span>纸张</span></button><button><i class="warm"></i><span>暖色</span></button><button><i class="night"></i><span>夜间</span></button><button><i class="system"></i><span>跟随系统</span></button></div></section><section><h3>行为</h3><label><span><strong>预读</strong><small>提前准备后续内容</small></span><select><option>3 章</option><option>5 章</option><option>10 章</option></select></label><label><span><strong>音频默认速度</strong><small>有声内容播放速度</small></span><select><option>1.0×</option><option>1.25×</option><option>1.5×</option></select></label></section></main></div>
    </section>

    <section v-if="screen==='backup'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('me')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>数据与同步</strong><small>备份、恢复和迁移</small></div></header>
      <div class="workspace-content narrow-page"><section class="backup-hero"><span class="backup-icon" v-html="icon('backup')"></span><div><strong>最近备份</strong><small>昨天 23:18 · 428 MB</small></div><button class="primary-action">立即备份</button></section><section class="setting-block"><header><strong>本地</strong><small>导出或恢复完整数据包</small></header><button class="settings-link"><span class="row-icon" v-html="icon('export')"></span><span><strong>导出备份文件</strong><small>内容库、历史、书签、设置、来源和缓存</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button><button class="settings-link"><span class="row-icon" v-html="icon('import')"></span><span><strong>从备份恢复</strong><small>会替换当前本地数据</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button></section><section class="setting-block"><header><strong>WebDAV</strong><small>在多个设备之间保存备份</small></header><div class="form-row"><span>地址</span><input value="https://example.com/remote.php/dav/files/user/"></div><div class="form-row"><span>用户名</span><input value="alice"></div><div class="form-row"><span>密码</span><input type="password" value="password"></div><div class="form-row"><span>自动备份</span><select><option>每天</option><option>每 12 小时</option><option>关闭</option></select></div><div class="button-row"><button>测试连接</button><button class="primary-action">保存</button></div></section></div>
    </section>

    <section v-if="screen==='settings'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="backToMain('me')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>高级设置</strong><small>低频但重要的应用能力</small></div><button class="icon-button"><span class="icon" v-html="icon('search')"></span></button></header>
      <div class="workspace-content settings-redesign"><section class="settings-category"><small>内容引擎</small><button @click="go('rules')"><span class="row-icon" v-html="icon('rule')"></span><span><strong>替换与净化</strong><small>文本替换规则和订阅</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button><button @click="go('txttoc')"><span class="row-icon" v-html="icon('text')"></span><span><strong>TXT 目录识别</strong><small>章节正则与优先级</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button><button @click="go('discovery-config')"><span class="row-icon" v-html="icon('layout')"></span><span><strong>发现页配置</strong><small>标签、栏目与展示方式</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button></section><section class="settings-category"><small>网络与缓存</small><button @click="modal='cache'"><span class="row-icon" v-html="icon('cache')"></span><span><strong>正文缓存</strong><small>486 MB · 1,612 个缓存项</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button><button @click="modal='network'"><span class="row-icon" v-html="icon('network')"></span><span><strong>网络请求</strong><small>超时、重试和更新检查</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button></section><section class="settings-category"><small>朗读</small><button @click="go('tts')"><span class="row-icon" v-html="icon('tts')"></span><span><strong>TTS 朗读源</strong><small>系统语音和 HTTP TTS</small></span><span class="chevron" v-html="icon('chevron-right')"></span></button></section></div>
    </section>

    <section v-if="screen==='rules'" class="workspace full-workspace">
      <header class="workspace-bar"><button class="icon-button" @click="go('settings')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>替换与净化</strong><small>显示前处理内容文本</small></div><button class="primary-small" @click="newRule()"><span class="icon" v-html="icon('plus')"></span> 新建</button></header>
      <div class="rule-workbench"><aside class="rule-master"><label class="mini-search"><span class="icon" v-html="icon('search')"></span><input placeholder="搜索规则"></label><button v-for="r in replacementRules" :key="r.name" :class="{active:selectedRule?.name===r.name}" @click="selectedRule=r"><span class="rule-state" :class="{off:!r.enabled}"></span><span><strong>{{r.name}}</strong><small>{{r.scope}}</small></span><span v-if="r.subscription" class="mini-tag">订阅</span></button></aside><main v-if="selectedRule" class="rule-editor"><div class="editor-head"><div><strong>{{selectedRule.name}}</strong><small>{{selectedRule.subscription?'来自订阅，只读':'本地规则'}}</small></div><label class="switch"><input v-model="selectedRule.enabled" type="checkbox"><span></span></label></div><label><span>名称</span><input v-model="selectedRule.name"></label><label><span>查找</span><textarea v-model="selectedRule.pattern"></textarea></label><label><span>替换为</span><textarea placeholder="留空表示删除匹配内容"></textarea></label><label><span>作用范围</span><select v-model="selectedRule.scope"><option>正文</option><option>标题</option><option>全部内容</option></select></label><div class="editor-preview"><small>即时预览</small><p>这是一段示例正文。匹配到的内容会在这里实时显示处理后的效果。</p></div><div class="button-row"><button class="danger-text">删除</button><span></span><button>还原</button><button class="primary-action">保存</button></div></main></div>
    </section>

    <section v-if="screen==='txttoc'" class="workspace full-workspace">
      <header class="workspace-bar"><button class="icon-button" @click="go('settings')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>TXT 目录识别</strong><small>导入 TXT 时如何识别章节</small></div><button class="primary-small" @click="newTocRule()"><span class="icon" v-html="icon('plus')"></span> 新建</button></header>
      <div class="toc-workbench"><aside class="toc-list"><article v-for="(r,i) in tocRules" :key="r.name" :class="{active:selectedToc?.name===r.name}" @click="selectedToc=r"><span class="drag-dots"><i></i><i></i><i></i><i></i></span><div><strong>{{r.name}}</strong><small>{{r.regex}}</small></div><span>{{i+1}}</span></article></aside><main v-if="selectedToc" class="toc-editor"><label><span>名称</span><input v-model="selectedToc.name"></label><label><span>正则表达式</span><textarea v-model="selectedToc.regex"></textarea></label><div class="toc-test"><header><strong>测试文本</strong><button>重新检测</button></header><pre>第一卷 风起
第1章 山水之间
第2章 长夜
第二卷 远行
第3章 归途</pre><div><span>识别到 3 个章节</span><strong>第1章 山水之间</strong><strong>第2章 长夜</strong><strong>第3章 归途</strong></div></div><div class="button-row"><button class="danger-text">删除</button><span></span><button class="primary-action">保存</button></div></main></div>
    </section>

    <section v-if="screen==='tts'" class="workspace full-workspace">
      <header class="workspace-bar"><button class="icon-button" @click="go('settings')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>TTS 朗读源</strong><small>系统语音与网络朗读</small></div><button class="primary-small" @click="newTts()"><span class="icon" v-html="icon('plus')"></span> 新建</button></header>
      <div class="tts-workbench"><aside class="tts-master"><button class="system-voice"><span class="tts-mark" v-html="icon('speaker')"></span><span><strong>系统语音</strong><small>使用设备语音服务</small></span></button><small class="sidebar-label">HTTP TTS</small><button v-for="t in ttsConfigs" :key="t.name" :class="{active:selectedTts?.name===t.name}" @click="selectedTts=t"><span class="tts-mark" v-html="icon('cloud')"></span><span><strong>{{t.name}}</strong><small>{{t.enabled?'已启用':'已停用'}}</small></span></button></aside><main class="tts-editor"><div class="editor-head"><div><strong>{{selectedTts?.name || '系统语音'}}</strong><small>{{selectedTts?'HTTP TTS 配置':'由系统提供语音与语言'}}</small></div><button class="ghost-action">测试播放</button></div><template v-if="selectedTts"><label><span>名称</span><input v-model="selectedTts.name"></label><label><span>URL</span><input v-model="selectedTts.url"></label><div class="editor-grid"><label><span>Content-Type</span><input value="application/json"></label><label><span>并发率</span><input value="0"></label></div><label><span>请求头</span><textarea placeholder="可选"></textarea></label><label><span>登录脚本</span><textarea placeholder="可选"></textarea></label><div class="button-row"><button class="danger-text">删除</button><span></span><button class="primary-action">保存</button></div></template></main></div>
    </section>

    <section v-if="screen==='discovery-config'" class="workspace">
      <header class="workspace-bar"><button class="icon-button" @click="go('settings')"><span class="icon" v-html="icon('arrow-left')"></span></button><div class="workspace-title"><strong>发现页配置</strong><small>控制发现页的内容组织</small></div><button class="text-action">保存</button></header>
      <div class="workspace-content discovery-config"><div class="config-tabs"><button class="active">推荐</button><button>小说</button><button>漫画</button><button>视频</button><button><span class="icon" v-html="icon('plus')"></span></button></div><div class="config-board"><article v-for="c in configSections" :key="c.title"><span class="drag-dots"><i></i><i></i><i></i><i></i></span><div class="config-card-main"><input v-model="c.title"><small>{{c.source}} · {{c.category}}</small></div><select v-model="c.style"><option>封面流</option><option>榜单</option><option>横向滚动</option><option>紧凑列表</option></select><button class="icon-button"><span class="icon" v-html="icon('more')"></span></button></article><button class="add-section"><span class="icon" v-html="icon('plus')"></span> 添加栏目</button></div></div>
    </section>

    <section v-if="screen==='detail' && selected" class="detail-page">
      <header class="detail-topbar"><button class="icon-button" @click="returnFromDetail"><span class="icon" v-html="icon('arrow-left')"></span></button><nav><button :class="{active:detailTab==='overview'}" @click="detailTab='overview'">概览</button><button :class="{active:detailTab==='catalog'}" @click="detailTab='catalog'">{{catalogLabel}}</button><button :class="{active:detailTab==='sources'}" @click="detailTab='sources'">来源</button></nav><div><button class="icon-button"><span class="icon" v-html="icon('bookmark')"></span></button><button class="icon-button"><span class="icon" v-html="icon('more')"></span></button></div></header>
      <div v-if="detailTab==='overview'" class="detail-overview"><section class="detail-hero"><img :src="selected.img" alt=""><div class="detail-meta"><small>{{labels[selected.type]}} · {{selected.kind}}</small><h1>{{selected.title}}</h1><p>{{selected.author}}</p><div class="detail-actions"><button class="primary-action large" @click="startReader(selected.type)"><span class="icon" v-html="icon(selected.type==='video'?'play':selected.type==='audio'?'audio':'book-open')"></span>{{primaryAction}}</button><button class="secondary-action">收藏</button></div></div><aside class="detail-progress"><small>{{progressLabel}}</small><strong>{{selected.progress}}</strong><span><i :style="{width:selected.progressPct+'%'}"></i></span><button @click="detailTab='catalog'">查看{{catalogLabel}}</button></aside></section><section class="detail-facts"><div><small>规模</small><strong>{{selected.wordCount}}</strong></div><div><small>更新</small><strong>{{selected.latestChapter}}</strong></div><div><small>来源</small><strong>{{selected.sourceName}}</strong></div><div><small>缓存</small><strong>{{Math.round(selected.chapterCount*.38)}} / {{selected.chapterCount}}</strong></div></section><section class="detail-section"><header><strong>简介</strong></header><p>{{selected.intro}}</p></section><section class="detail-section"><header><strong>最近内容</strong><button @click="detailTab='catalog'">全部{{catalogLabel}} <span class="icon" v-html="icon('chevron-right')"></span></button></header><div class="recent-chapters"><button v-for="c in chapterRows.slice(0,4)" :key="c.title" @click="startReader(selected.type)"><span>{{c.title}}</span><small>{{c.duration || (c.cached?'已缓存':'在线')}}</small></button></div></section></div>
      <div v-else-if="detailTab==='catalog'" class="detail-catalog"><div class="catalog-toolbar"><label class="mini-search"><span class="icon" v-html="icon('search')"></span><input v-model="catalogQuery" :placeholder="'搜索'+catalogLabel"></label><div><button>定位当前</button><button>排序</button><button>缓存全部</button></div></div><div class="chapter-list"><article v-for="(c,i) in chapterRows" :key="c.title" :class="{current:c.current}"><button @click="startReader(selected.type)"><span>{{String(i+1).padStart(2,'0')}}</span><div><strong>{{c.title}}</strong><small>{{c.current?'当前位置':c.duration || (c.cached?'已缓存':'未缓存')}}</small></div><i :class="{cached:c.cached}"></i></button><button v-if="selected.type==='novel'||selected.type==='comic'"><span class="icon" v-html="icon('source-switch')"></span></button></article></div></div>
      <div v-else class="detail-sources"><section class="current-source"><small>当前来源</small><div><span class="source-large-icon" v-html="icon(sourceKindIcon(labels[selected.type]))"></span><div><strong>{{selected.sourceName}}</strong><small>{{selected.sourceGroup}} · 响应正常</small></div><button>刷新信息</button></div></section><section class="source-alternatives"><header><strong>可替换来源</strong><label class="mini-search"><span class="icon" v-html="icon('search')"></span><input :value="selected.title"></label></header><article v-for="(s,i) in sourceCandidates" :key="s.name"><div><strong>{{s.name}}</strong><span>{{s.author}} · {{s.latest}}</span><small>{{s.speed}}</small></div><button :class="{primary:i===0}">{{i===0?'当前':'切换'}}</button></article></section></div>
    </section>

    <section v-if="screen==='reader'" class="reader-page reader-v2" :class="'mode-'+readerMode">
      <header class="reader-bar reader-bar-v2">
        <button class="icon-button" @click="leaveReader"><span class="icon" v-html="icon('arrow-left')"></span></button>
        <div class="reader-heading">
          <strong>{{selected?.title}}</strong>
          <small>{{readerChapterTitle}}</small>
        </div>
        <div class="reader-head-actions">
          <button v-if="readerMode==='novel'" class="icon-button" title="本章搜索" @click="readerPanel='novel-search'"><span class="icon" v-html="icon('search')"></span></button>
          <button v-if="readerMode==='novel'" class="icon-button" title="书签" @click="readerPanel='bookmark'"><span class="icon" v-html="icon('bookmark')"></span></button>
          <button v-if="readerMode==='novel'||readerMode==='comic'" class="icon-button" title="换源"><span class="icon" v-html="icon('source-switch')"></span></button>
          <button class="icon-button" title="更多"><span class="icon" v-html="icon('more')"></span></button>
        </div>
      </header>

      <main class="reader-stage reader-stage-v2">
        <!-- Text: reading first, controls stay out of the page -->
        <article v-if="readerMode==='novel'" class="novel-reader-v2">
          <div class="novel-reading-meta"><span>923 / 1268</span><span>73%</span></div>
          <h1>{{readerChapterTitle}}</h1>
          <p v-for="p in readerParagraphs" :key="p">{{p}}</p>
          <div class="chapter-end">
            <small>本章完</small>
            <button>下一章 <span class="icon" v-html="icon('chevron-right')"></span></button>
          </div>
        </article>

        <!-- Comic: pages own the screen; reading controls are comic-specific -->
        <article v-else-if="readerMode==='comic'" class="comic-reader-v2" :class="['comic-'+comicMode,'fit-'+comicFit]">
          <div class="comic-page"><img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=88" alt=""></div>
          <div class="comic-page"><img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=88" alt=""></div>
          <span class="comic-page-counter">12 / 24</span>
        </article>

        <!-- Video: player controls live with the player, not in a generic reader dock -->
        <article v-else-if="readerMode==='video'" class="video-player-v2">
          <div class="video-surface-v2">
            <img :src="selected?.img" alt="">
            <button class="video-center-play"><span class="icon" v-html="icon('play')"></span></button>
            <div class="video-overlay-controls">
              <div class="video-time-row"><span>18:42</span><i><b></b></i><span>42:06</span></div>
              <div class="video-action-row">
                <button class="video-play-small"><span class="icon" v-html="icon('play')"></span></button>
                <button @click="readerPanel='video-episodes'"><span class="icon" v-html="icon('list')"></span><em>选集</em></button>
                <span class="video-control-spacer"></span>
                <select v-model="mediaSpeed" title="播放速度"><option>0.75</option><option>1.0</option><option>1.25</option><option>1.5</option><option>2.0</option></select>
                <select v-model="videoQuality" title="清晰度"><option>自动</option><option>1080P</option><option>720P</option><option>480P</option></select>
                <button :class="{active:subtitlesOn}" @click="subtitlesOn=!subtitlesOn"><em>字幕</em></button>
                <button title="全屏"><span class="icon" v-html="icon('fullscreen')"></span></button>
              </div>
            </div>
          </div>
          <div class="video-now-playing">
            <div><strong>{{readerChapterTitle}}</strong><small>{{selected?.title}} · {{selected?.author}}</small></div>
            <button @click="readerPanel='video-episodes'">18 / 40 集 <span class="icon" v-html="icon('chevron-right')"></span></button>
          </div>
        </article>

        <!-- Audio: speed/sleep/queue are first-class controls -->
        <article v-else-if="readerMode==='audio'" class="audio-player-v2">
          <div class="audio-art-v2"><img :src="selected?.img" alt=""></div>
          <div class="audio-content-v2">
            <small>{{selected?.author}}</small>
            <h1>{{selected?.title}}</h1>
            <strong>{{readerChapterTitle}}</strong>
            <div class="audio-wave-v2"><i v-for="n in 54" :key="n" :style="{height:(9+(n*11)%34)+'px'}"></i></div>
            <div class="audio-progress-v2"><span>18:42</span><b><i></i></b><span>42:06</span></div>
            <div class="audio-main-controls">
              <button title="后退 15 秒"><span class="icon" v-html="icon('back15')"></span></button>
              <button class="audio-play-main"><span class="icon" v-html="icon('play')"></span></button>
              <button title="前进 15 秒"><span class="icon" v-html="icon('forward15')"></span></button>
            </div>
            <div class="audio-utility-row">
              <button @click="readerPanel='audio-speed'"><strong>{{mediaSpeed}}×</strong><small>倍速</small></button>
              <button @click="readerPanel='audio-sleep'"><span class="icon" v-html="icon('moon')"></span><small>睡眠</small></button>
              <button @click="readerPanel='audio-episodes'"><span class="icon" v-html="icon('list')"></span><small>节目</small></button>
            </div>
          </div>
        </article>

        <!-- PDF kept document-specific -->
        <article v-else class="pdf-reader-v2">
          <aside><span v-for="n in 5" :key="n" :class="{active:n===3}">{{n}}</span></aside>
          <div class="pdf-sheet-v2"><small>PDF · 第 23 页</small><h2>示例 PDF 页面</h2><p v-for="p in readerParagraphs.slice(0,4)" :key="p">{{p}}</p></div>
        </article>
      </main>

      <!-- Only modes that actually need a persistent dock get one -->
      <footer v-if="readerMode==='novel'" class="reader-dock-v2 text-dock">
        <button @click="readerPanel='directory'"><span class="icon" v-html="icon('list')"></span><small>目录</small></button>
        <button @click="readerPanel='tts'"><span class="icon" v-html="icon('tts')"></span><small>朗读</small></button>
        <button @click="readerPanel='appearance'"><span class="icon" v-html="icon('appearance')"></span><small>显示</small></button>
      </footer>

      <footer v-else-if="readerMode==='comic'" class="reader-dock-v2 comic-dock">
        <button @click="readerPanel='comic-chapters'"><span class="icon" v-html="icon('list')"></span><small>选话</small></button>
        <button @click="readerPanel='comic-mode'"><span class="icon" v-html="icon('layout')"></span><small>阅读模式</small></button>
        <button @click="readerPanel='comic-fit'"><span class="icon" v-html="icon('appearance')"></span><small>图片适配</small></button>
        <button @click="readerPanel='comic-brightness'"><span class="icon" v-html="icon('sun')"></span><small>亮度</small></button>
      </footer>

      <footer v-else-if="readerMode==='pdf'" class="reader-dock-v2 pdf-dock">
        <button @click="readerPanel='pdf-pages'"><span class="icon" v-html="icon('list')"></span><small>页面</small></button>
        <button @click="readerPanel='pdf-search'"><span class="icon" v-html="icon('search')"></span><small>搜索</small></button>
        <button @click="readerPanel='pdf-display'"><span class="icon" v-html="icon('appearance')"></span><small>显示</small></button>
        <button @click="readerPanel='bookmark'"><span class="icon" v-html="icon('bookmark')"></span><small>书签</small></button>
      </footer>

      <aside v-if="readerPanel" class="reader-sheet reader-sheet-v2">
        <header><strong>{{readerPanelTitle}}</strong><button @click="readerPanel=null"><span class="icon" v-html="icon('close')"></span></button></header>

        <template v-if="readerPanel==='directory'||readerPanel==='comic-chapters'||readerPanel==='video-episodes'||readerPanel==='audio-episodes'">
          <label class="mini-search"><span class="icon" v-html="icon('search')"></span><input :placeholder="readerMode==='video'?'搜索剧集':readerMode==='audio'?'搜索节目':'搜索章节'"></label>
          <button v-for="(c,i) in readerDirectory" :key="c" class="directory-row" :class="{current:i===5}">
            <span>{{String(i+1).padStart(2,'0')}}</span><strong>{{readerMode==='video'?'第 '+(i+13)+' 集':readerMode==='audio'?'EP.'+(i+116):c}}</strong><small v-if="i===5">当前</small>
          </button>
        </template>

        <template v-else-if="readerPanel==='novel-search'">
          <label class="mini-search"><span class="icon" v-html="icon('search')"></span><input v-model="novelSearch" autofocus placeholder="在本章中查找"></label>
          <div class="reader-search-empty">{{novelSearch ? '找到 2 处匹配内容' : '输入关键词查找本章内容'}}</div>
        </template>

        <template v-else-if="readerPanel==='tts'">
          <label class="sheet-setting"><span>朗读引擎</span><select><option>系统默认</option><option>Edge TTS</option></select></label>
          <label class="sheet-setting"><span>语速</span><select><option>0.8×</option><option>1.0×</option><option>1.2×</option><option>1.5×</option><option>2.0×</option></select></label>
          <label class="sheet-setting"><span>连续朗读</span><input type="checkbox" checked></label>
          <button class="primary-action wide">开始朗读</button>
        </template>

        <template v-else-if="readerPanel==='appearance'">
          <label class="sheet-setting"><span>翻页方式</span><select><option>左右翻页</option><option>上下滚动</option></select></label>
          <label class="sheet-setting"><span>字号</span><input type="range" min="12" max="36" value="18"></label>
          <label class="sheet-setting"><span>行距</span><input type="range" min="1.2" max="2.8" step=".1" value="1.8"></label>
          <div class="reader-themes"><button class="active">纸</button><button>暖</button><button>夜</button></div>
        </template>

        <template v-else-if="readerPanel==='bookmark'">
          <textarea placeholder="书签备注（可选）"></textarea>
          <div class="button-row"><span></span><span></span><button class="primary-action">保存当前位置</button></div>
        </template>

        <template v-else-if="readerPanel==='comic-mode'">
          <button class="choice-row" :class="{active:comicMode==='vertical'}" @click="comicMode='vertical'"><span><strong>上下连续</strong><small>适合条漫和连续阅读</small></span><i></i></button>
          <button class="choice-row" :class="{active:comicMode==='paged'}" @click="comicMode='paged'"><span><strong>左右翻页</strong><small>单页浏览，左右切换</small></span><i></i></button>
        </template>

        <template v-else-if="readerPanel==='comic-fit'">
          <button class="choice-row" :class="{active:comicFit==='width'}" @click="comicFit='width'"><span><strong>适合宽度</strong><small>图片宽度填满可视区域</small></span><i></i></button>
          <button class="choice-row" :class="{active:comicFit==='original'}" @click="comicFit='original'"><span><strong>原始大小</strong><small>保留图片原始比例和尺寸</small></span><i></i></button>
        </template>

        <template v-else-if="readerPanel==='comic-brightness'">
          <label class="brightness-control"><span class="icon" v-html="icon('sun')"></span><input v-model="readerBrightness" type="range" min="30" max="100"><strong>{{readerBrightness}}%</strong></label>
        </template>

        <template v-else-if="readerPanel==='audio-speed'">
          <div class="speed-grid"><button v-for="s in ['0.75','1.0','1.25','1.5','1.75','2.0']" :key="s" :class="{active:mediaSpeed===s}" @click="mediaSpeed=s;readerPanel=null">{{s}}×</button></div>
        </template>

        <template v-else-if="readerPanel==='audio-sleep'">
          <div class="sleep-list"><button v-for="s in ['关闭','15 分钟','30 分钟','45 分钟','60 分钟','本期结束']" :key="s" :class="{active:sleepTimer===s}" @click="sleepTimer=s">{{s}}<span v-if="sleepTimer===s">✓</span></button></div>
        </template>

        <template v-else-if="readerPanel==='pdf-pages'">
          <div class="pdf-page-grid"><button v-for="n in 12" :key="n" :class="{active:n===3}"><span>{{n}}</span></button></div>
        </template>

        <template v-else-if="readerPanel==='pdf-search'">
          <label class="mini-search"><span class="icon" v-html="icon('search')"></span><input placeholder="搜索文档文字"></label>
          <div class="reader-search-empty">输入关键词搜索整个文档</div>
        </template>

        <template v-else-if="readerPanel==='pdf-display'">
          <label class="sheet-setting"><span>页面适配</span><select><option>整页</option><option>适合宽度</option><option>实际大小</option></select></label>
          <label class="sheet-setting"><span>页面方向</span><select><option>纵向</option><option>横向</option></select></label>
        </template>
      </aside>
    </section>

    <button v-if="screen!=='reader' && !reviewOpen" class="review-button" @click="reviewOpen=true">界面索引</button>
    <aside v-if="reviewOpen" class="review-panel"><header><div><strong>界面索引</strong><small>仅用于审阅</small></div><button @click="reviewOpen=false"><span class="icon" v-html="icon('close')"></span></button></header><div><button @click="backToMain('discover')">发现</button><button @click="backToMain('library')">内容库</button><button @click="backToMain('me')">我的</button><button @click="go('search')">搜索</button><button @click="go('articles')">订阅</button><button @click="go('library-manage')">整理内容库</button><button @click="go('import')">导入</button><button @click="go('history')">历史</button><button @click="go('bookmarks')">书签</button><button @click="go('tasks')">下载与任务</button><button @click="go('sources')">来源</button><button @click="go('appearance')">阅读与播放</button><button @click="go('backup')">数据与同步</button><button @click="go('settings')">高级设置</button><button @click="go('rules')">替换净化</button><button @click="go('txttoc')">TXT 目录</button><button @click="go('tts')">TTS</button><button @click="go('discovery-config')">发现页配置</button><button @click="previewDetail('novel')">小说详情</button><button @click="previewDetail('comic')">漫画详情</button><button @click="previewDetail('video')">视频详情</button><button @click="previewDetail('audio')">音频详情</button><button @click="previewReader('novel')">小说阅读器</button><button @click="previewReader('comic')">漫画阅读器</button><button @click="previewReader('video')">视频播放器</button><button @click="previewReader('audio')">音频播放器</button><button @click="previewReader('pdf')">PDF 阅读器</button></div></aside>

    <div v-if="modal" class="modal-backdrop" @click.self="modal=null">
      <section v-if="modal==='article'" class="modal-card article-modal"><header><div><small>{{activeArticle?.source}}</small><strong>{{activeArticle?.title}}</strong></div><button @click="modal=null"><span class="icon" v-html="icon('close')"></span></button></header><article><p>{{activeArticle?.summary}}</p><p v-for="p in readerParagraphs.slice(0,4)" :key="p">{{p}}</p></article></section>
      <section v-else-if="modal==='source-import'" class="modal-card"><header><div><small>内容来源</small><strong>添加来源</strong></div><button @click="modal=null"><span class="icon" v-html="icon('close')"></span></button></header><div class="modal-body"><div class="source-add-options"><button><span class="icon" v-html="icon('link')"></span><strong>通过链接</strong><small>JSON / RSS / 分享链接</small></button><button><span class="icon" v-html="icon('file')"></span><strong>本地文件</strong><small>导入 JSON 配置</small></button></div><label class="modal-field"><span>链接</span><input placeholder="https://example.com/source.json"></label></div><footer><button @click="modal=null">取消</button><button class="primary-action">继续</button></footer></section>
      <section v-else-if="modal==='source-test'" class="modal-card wide-modal"><header><div><small>来源测试</small><strong>{{selectedSource?.name}}</strong></div><button @click="modal=null"><span class="icon" v-html="icon('close')"></span></button></header><div class="modal-body source-test"><label class="mini-search"><span class="icon" v-html="icon('search')"></span><input value="三体"><button class="primary-small">运行</button></label><div class="test-steps"><span class="done">搜索</span><span class="done">详情</span><span class="active">目录</span><span>正文</span></div><div class="test-output"><small>当前结果</small><strong>三体 · 刘慈欣</strong><span>188 章 · 详情与目录解析正常</span></div><pre>GET /book/10086/chapter/1
200 OK · 382 ms

章节正文解析成功
净化规则：3 条
输出长度：4,812 字</pre></div></section>
      <section v-else-if="modal==='source-login'" class="modal-card"><header><div><small>来源登录</small><strong>{{selectedSource?.name}}</strong></div><button @click="modal=null"><span class="icon" v-html="icon('close')"></span></button></header><div class="modal-body"><label class="modal-field"><span>用户名</span><input></label><label class="modal-field"><span>密码</span><input type="password"></label><button class="secondary-action wide">打开网页登录</button></div><footer><button @click="modal=null">取消</button><button class="primary-action">登录</button></footer></section>
      <section v-else-if="modal==='source-edit'" class="modal-card"><header><div><small>来源</small><strong>编辑信息</strong></div><button @click="modal=null"><span class="icon" v-html="icon('close')"></span></button></header><div class="modal-body"><label class="modal-field"><span>名称</span><input v-model="selectedSource.name"></label><label class="modal-field"><span>分组</span><input v-model="selectedSource.group"></label><label class="modal-field"><span>User-Agent</span><input placeholder="使用默认"></label></div><footer><button @click="modal=null">取消</button><button class="primary-action">保存</button></footer></section>
      <section v-else-if="modal==='cache'" class="modal-card"><header><div><small>网络与缓存</small><strong>正文缓存</strong></div><button @click="modal=null"><span class="icon" v-html="icon('close')"></span></button></header><div class="modal-body cache-modal"><div><span>在线正文</span><strong>421 MB</strong><small>1,284 个缓存项</small></div><div><span>本地内容</span><strong>65 MB</strong><small>328 个缓存项</small></div><button class="danger-action"><span class="icon" v-html="icon('trash')"></span> 清理在线正文缓存</button></div></section>
      <section v-else-if="modal==='network'" class="modal-card"><header><div><small>网络与缓存</small><strong>网络请求</strong></div><button @click="modal=null"><span class="icon" v-html="icon('close')"></span></button></header><div class="modal-body"><label class="modal-field"><span>请求超时</span><select><option>30 秒</option><option>15 秒</option><option>60 秒</option></select></label><label class="modal-switch"><span><strong>自动检查更新</strong><small>应用运行期间定期检查</small></span><input type="checkbox" checked></label><label class="modal-field"><span>检查间隔</span><select><option>6 小时</option><option>12 小时</option><option>24 小时</option></select></label></div></section>
      <section v-else class="modal-card compact-modal"><header><div><small>导入</small><strong>正在处理文件</strong></div><button @click="modal=null"><span class="icon" v-html="icon('close')"></span></button></header><div class="modal-body"><div class="processing"><span class="spinner"></span><strong>正在解析目录和元数据</strong><small>68%</small><span class="processing-line"><i></i></span></div></div></section>
    </div>
  </div>
  `
}).mount("#app");
