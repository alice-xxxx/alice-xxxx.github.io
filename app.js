const { createApp, computed, ref } = Vue;

createApp({
  setup(){
    const tab=ref("discover");
    const discoverCategory=ref("all");
    const libraryCategory=ref("all");
    const search=ref("");
    const selected=ref(null);
    const detailTab=ref("info");
    const detailMenuOpen=ref(false);
    const sourceSwitchOpen=ref(false);
    const catalogSearch=ref("");

    const labels={novel:"小说",comic:"漫画",video:"视频",audio:"音频"};
    const categories=[
      {value:"all",label:"全部"},
      {value:"novel",label:"小说"},
      {value:"comic",label:"漫画"},
      {value:"video",label:"视频"},
      {value:"audio",label:"音频"}
    ];

    const items=[
      {
        id:"jianlai",type:"novel",title:"剑来",author:"烽火戏诸侯",
        sub:"烽火戏诸侯 · 少年持剑远游",stat:"326.5 万",
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
        sub:"刘慈欣 · 黑暗森林正在展开",stat:"198.3 万",
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
        sub:"动画 · 新海诚 · 121 分钟",stat:"412.8 万",
        img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86",
        kind:"电影",wordCount:"121 分钟",chapterCount:1,latestChapter:"正片",
        sourceName:"Anime Stream",sourceGroup:"视频",progress:"正片 · 38:12",
        intro:"门的另一侧，是被遗忘的地方。"
      },
      {
        id:"mysteries",type:"novel",title:"诡秘之主",author:"爱潜水的乌贼",
        sub:"爱潜水的乌贼 · 蒸汽与神秘",stat:"520.7 万",
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

    const libraryIds=new Set(["jianlai","threebody","goodnight","suzume","mysteries","blade"]);

    const discoverItems=computed(()=>{
      const q=search.value.trim().toLowerCase();
      return items.filter(item=>{
        if(discoverCategory.value!=="all"&&item.type!==discoverCategory.value)return false;
        if(!q)return true;
        return (item.title+" "+item.sub+" "+labels[item.type]).toLowerCase().includes(q);
      });
    });

    const libraryItems=computed(()=>items.filter(item=>
      libraryIds.has(item.id)&&(libraryCategory.value==="all"||item.type===libraryCategory.value)
    ));

    const navItems=[
      {key:"discover",label:"发现"},
      {key:"library",label:"内容库"},
      {key:"me",label:"我的"}
    ];

    const settingsA=[
      {icon:"◷",title:"历史记录",sub:"阅读、观看和收听历史"},
      {icon:"↓",title:"下载与任务",sub:"离线内容和后台任务"},
      {icon:"◎",title:"内容来源",sub:"书源、视频源、RSS 与扩展"}
    ];
    const settingsB=[
      {icon:"◐",title:"外观",sub:"主题、字体与显示密度"},
      {icon:"↻",title:"备份与同步",sub:"导入、导出和恢复"},
      {icon:"⚙",title:"设置",sub:"网络、缓存和高级选项"}
    ];

    const navIcon=(key,active)=> {
      if(key==="discover"){
        return active
          ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M15.9 8.1 13.35 13.35 8.1 15.9l2.55-5.25L15.9 8.1Z" fill="white"/><circle cx="12" cy="12" r="1.15" fill="currentColor"/></svg>'
          : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15.9 8.1 13.35 13.35 8.1 15.9l2.55-5.25L15.9 8.1Z" fill="currentColor"/></svg>';
      }
      if(key==="library"){
        return '<svg viewBox="0 0 24 24"><path d="M3.5 7.8h6.1l1.6 2h9.3v8.7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M3.5 10h17" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
      }
      return '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.2" r="3.25" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.7 19.1c.65-3.2 3-5 6.3-5s5.65 1.8 6.3 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
    };

    const openDetail=(item)=>{
      selected.value=item;
      detailTab.value="info";
      detailMenuOpen.value=false;
      sourceSwitchOpen.value=false;
      catalogSearch.value="";
    };

    const closeDetail=()=>{
      selected.value=null;
      detailMenuOpen.value=false;
      sourceSwitchOpen.value=false;
      catalogSearch.value="";
    };

    const catalogLabel=computed(()=>{
      if(!selected.value)return "目录";
      return selected.value.type==="video"?"剧集":selected.value.type==="audio"?"节目":"目录";
    });

    const primaryAction=computed(()=>{
      if(!selected.value)return "打开";
      if(selected.value.type==="video")return "继续观看";
      if(selected.value.type==="audio")return "继续收听";
      if(selected.value.type==="comic")return "继续阅读";
      return "继续阅读";
    });

    const chapterRows=computed(()=>{
      if(!selected.value)return [];
      const type=selected.value.type;
      const count=type==="video"?18:type==="audio"?18:type==="comic"?24:28;
      const current=Math.max(2,Math.floor(count*.58));
      return Array.from({length:count},(_,i)=>{
        const n=count-i;
        const title=type==="video"
          ? `第 ${n} 集 · ${["回到山里","旧友重逢","风从院子里吹过","夜路","山野之间"][n%5]}`
          : type==="audio"
            ? `EP.${String(n+100).padStart(3,"0")} · ${["留一点安静","雨停之后","夜间列车","今天也辛苦了","睡前来信"][n%5]}`
            : type==="comic"
              ? `第 ${n} 话 · ${["灯下","各自的答案","夏日","回声","向前一步"][n%5]}`
              : `第 ${n+900} 章 · ${["山水之间","长夜","归途","旧事","风雪客"][n%5]}`;
        return {
          index:i,
          title,
          current:i===current,
          cached:i%3!==0,
          duration:type==="video"?`${38+n%9} 分钟`:type==="audio"?`${24+n%22} 分钟`:""
        };
      }).filter(row=>!catalogSearch.value.trim()||row.title.toLowerCase().includes(catalogSearch.value.trim().toLowerCase()));
    });

    const sourceCandidates=[
      {name:"源仓 · 线路 A",author:"作者一致",latest:"更新至最新",speed:"响应 410ms"},
      {name:"阅读源 · 线路 B",author:"作者一致",latest:"少 2 章",speed:"响应 280ms"},
      {name:"聚合源 · 线路 C",author:"需确认作者",latest:"更新至最新",speed:"响应 690ms"}
    ];

    return {
      tab,discoverCategory,libraryCategory,search,selected,detailTab,detailMenuOpen,sourceSwitchOpen,catalogSearch,
      labels,categories,discoverItems,libraryItems,navItems,settingsA,settingsB,navIcon,
      openDetail,closeDetail,catalogLabel,primaryAction,chapterRows,sourceCandidates
    };
  },
  template:`
    <div class="app-shell">
      <aside class="side-rail">
        <div class="rail-list">
          <button v-for="n in navItems" :key="n.key" class="rail-item" :class="{active:tab===n.key}" @click="tab=n.key">
            <span class="nav-icon" v-html="navIcon(n.key,tab===n.key)"></span>
            <span>{{n.label}}</span>
          </button>
        </div>
      </aside>

      <div class="page-wrap">
        <main class="page">
          <section v-if="tab==='discover'">
            <div class="topbar">
              <label class="search-box">
                <svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m15.6 15.6 4.2 4.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                <input v-model="search" type="search" placeholder="搜索内容、作者、频道或来源">
              </label>
            </div>

            <nav class="chips">
              <button v-for="c in categories" :key="c.value" class="chip" :class="{active:discoverCategory===c.value}" @click="discoverCategory=c.value">{{c.label}}</button>
            </nav>

            <div v-if="discoverItems.length" class="content-grid">
              <article v-for="item in discoverItems" :key="item.id" class="content-card">
                <button class="cover-button" @click="openDetail(item)">
                  <div class="cover"><img :src="item.img" :alt="item.title" loading="lazy"></div>
                  <div class="card-info">
                    <div class="card-title">{{item.title}}</div>
                    <div class="card-sub">{{item.sub}}</div>
                    <div class="card-meta">
                      <i class="type-mark" :class="'type-'+item.type">{{labels[item.type][0]}}</i>
                      <span>{{labels[item.type]}}</span><span>·</span><span>{{item.stat}}</span>
                    </div>
                  </div>
                </button>
              </article>
            </div>
            <div v-else class="empty"><strong>没有找到相关内容</strong><span>换一个关键词或内容类型试试。</span></div>
          </section>

          <section v-else-if="tab==='library'" class="library-view">
            <div class="library-head"><span>{{libraryItems.length}} 个收藏</span><button class="sort-button">最近浏览 ↓</button></div>
            <nav class="chips">
              <button v-for="c in categories" :key="c.value" class="chip" :class="{active:libraryCategory===c.value}" @click="libraryCategory=c.value">{{c.label}}</button>
            </nav>
            <div class="content-grid">
              <article v-for="item in libraryItems" :key="item.id" class="content-card">
                <button class="cover-button" @click="openDetail(item)">
                  <div class="cover"><img :src="item.img" :alt="item.title" loading="lazy"></div>
                  <div class="card-info">
                    <div class="card-title">{{item.title}}</div>
                    <div class="card-sub">{{item.sub}}</div>
                    <div class="card-meta">
                      <i class="type-mark" :class="'type-'+item.type">{{labels[item.type][0]}}</i>
                      <span>{{labels[item.type]}}</span><span>·</span><span>最近浏览</span>
                    </div>
                  </div>
                </button>
              </article>
            </div>
          </section>

          <section v-else class="me-view">
            <div class="settings-group first-group">
              <small class="group-label">内容与数据</small>
              <button v-for="s in settingsA" :key="s.title" class="setting-row">
                <span class="setting-icon">{{s.icon}}</span>
                <span class="setting-copy"><strong>{{s.title}}</strong><small>{{s.sub}}</small></span>
                <span class="chevron">›</span>
              </button>
            </div>
            <div class="settings-group">
              <small class="group-label">应用</small>
              <button v-for="s in settingsB" :key="s.title" class="setting-row">
                <span class="setting-icon">{{s.icon}}</span>
                <span class="setting-copy"><strong>{{s.title}}</strong><small>{{s.sub}}</small></span>
                <span class="chevron">›</span>
              </button>
            </div>
          </section>
        </main>
      </div>

      <nav class="bottom-nav">
        <button v-for="n in navItems" :key="n.key" class="bottom-item" :class="{active:tab===n.key}" @click="tab=n.key">
          <span class="nav-icon" v-html="navIcon(n.key,tab===n.key)"></span>
          <span>{{n.label}}</span>
        </button>
      </nav>

      <div v-if="selected" class="detail-backdrop" @click.self="closeDetail">
        <article class="detail-workspace">
          <header class="detail-toolbar">
            <button class="toolbar-icon" aria-label="返回" @click="closeDetail">‹</button>
            <nav class="detail-tabs">
              <button :class="{active:detailTab==='info'}" @click="detailTab='info'">信息</button>
              <button :class="{active:detailTab==='catalog'}" @click="detailTab='catalog'">{{catalogLabel}}</button>
            </nav>
            <div class="detail-toolbar-end">
              <button v-if="detailTab==='catalog'" class="toolbar-icon" aria-label="搜索目录" @click="catalogSearch=catalogSearch?'':' '">⌕</button>
              <div class="detail-menu-wrap">
                <button class="toolbar-icon" aria-label="更多" @click.stop="detailMenuOpen=!detailMenuOpen">•••</button>
                <div v-if="detailMenuOpen" class="detail-menu" @click.stop>
                  <button>编辑显示信息</button>
                  <button>刷新内容信息</button>
                  <button>重置阅读进度</button>
                  <button>清除正文缓存</button>
                  <button @click="sourceSwitchOpen=true;detailMenuOpen=false">更换来源</button>
                  <div></div>
                  <button>刷新{{catalogLabel}}</button>
                  <button>检查更新</button>
                  <button>缓存全部{{catalogLabel}}</button>
                  <div></div>
                  <button class="danger-text">从内容库移除</button>
                </div>
              </div>
            </div>
          </header>

          <main class="detail-body" @click="detailMenuOpen=false">
            <section v-if="detailTab==='info'" class="detail-info-page">
              <div class="detail-hero-rich" :class="'hero-'+selected.type">
                <div class="detail-cover-rich"><img :src="selected.img" :alt="selected.title"></div>
                <div class="detail-hero-copy">
                  <span class="detail-kind">{{labels[selected.type]}}</span>
                  <h2>{{selected.title}}</h2>
                  <p class="detail-author">{{selected.author}}</p>
                  <div class="hero-actions">
                    <button class="primary-btn">{{primaryAction}}</button>
                    <button class="ghost-btn">收藏</button>
                    <button class="ghost-btn" @click="sourceSwitchOpen=true">换源</button>
                  </div>
                </div>

                <div class="progress-panel">
                  <small>{{selected.type==='video'?'观看进度':selected.type==='audio'?'收听进度':'阅读进度'}}</small>
                  <strong>{{selected.progress}}</strong>
                  <span class="progress-track"><i style="width:62%"></i></span>
                </div>
              </div>

              <div class="detail-facts">
                <span><small>类型</small><strong>{{selected.kind}}</strong></span>
                <span><small>{{selected.type==='video'||selected.type==='audio'?'规模':'字数 / 话数'}}</small><strong>{{selected.wordCount}}</strong></span>
                <span><small>来源</small><strong>{{selected.sourceName}}</strong></span>
                <span><small>分组</small><strong>{{selected.sourceGroup}}</strong></span>
              </div>

              <section class="detail-section">
                <div class="section-title-row"><h3>更新</h3><button @click="detailTab='catalog'">查看{{catalogLabel}} ›</button></div>
                <div class="latest-row">
                  <span><small>最新</small><strong>{{selected.latestChapter}}</strong></span>
                  <span><small>总计</small><strong>{{selected.chapterCount}} {{selected.type==='video'?'集':selected.type==='audio'?'期':'章'}}</strong></span>
                  <span><small>缓存</small><strong>{{Math.round(selected.chapterCount*.38)}} / {{selected.chapterCount}}</strong></span>
                </div>
              </section>

              <section class="detail-section">
                <div class="section-title-row"><h3>简介</h3><button>编辑显示信息</button></div>
                <p class="detail-intro">{{selected.intro}}</p>
              </section>

              <section class="detail-section source-section">
                <div class="section-title-row"><h3>内容来源</h3><button @click="sourceSwitchOpen=true">更换来源 ›</button></div>
                <div class="source-current">
                  <div>
                    <strong>{{selected.sourceName}}</strong>
                    <span>{{selected.sourceGroup}} · 已启用 · 可刷新信息</span>
                  </div>
                  <div class="source-actions">
                    <button>刷新信息</button>
                    <button>检查更新</button>
                  </div>
                </div>
              </section>

              <section class="detail-section compact-actions">
                <button>刷新{{catalogLabel}}</button>
                <button>缓存全部</button>
                <button>清除正文缓存</button>
                <button>重置进度</button>
              </section>
            </section>

            <section v-else class="catalog-page">
              <div class="catalog-head-rich">
                <div>
                  <strong>{{chapterRows.length}} / {{selected.chapterCount}} {{selected.type==='video'?'集':selected.type==='audio'?'期':'章'}}</strong>
                  <span v-if="selected.type==='video'||selected.type==='audio'">媒体内容只支持整书换源</span>
                  <span v-else>支持章节级正文替换</span>
                </div>
                <div>
                  <button>定位当前</button>
                  <button>刷新</button>
                  <button>缓存全部</button>
                </div>
              </div>

              <label class="catalog-search-rich">
                <span>⌕</span>
                <input v-model="catalogSearch" :placeholder="'搜索'+catalogLabel">
                <button v-if="catalogSearch" @click="catalogSearch=''">×</button>
              </label>

              <div class="catalog-list-rich">
                <div v-for="(chapter,i) in chapterRows" :key="chapter.index" class="catalog-row-rich" :class="{current:chapter.current}">
                  <button class="catalog-main-action">
                    <span class="catalog-index">{{String(i+1).padStart(2,'0')}}</span>
                    <span class="catalog-copy">
                      <strong>{{chapter.title}}</strong>
                      <small>
                        <template v-if="chapter.current">当前{{selected.type==='video'?'观看':selected.type==='audio'?'收听':'阅读'}}位置</template>
                        <template v-else-if="chapter.duration">{{chapter.duration}}</template>
                        <template v-else>{{chapter.cached?'已缓存':'未缓存'}}</template>
                      </small>
                    </span>
                    <span v-if="chapter.cached" class="cache-dot" title="已缓存"></span>
                    <span v-else class="cache-dot empty" title="未缓存"></span>
                  </button>
                  <button v-if="selected.type!=='video'&&selected.type!=='audio'" class="replace-source-btn" title="替换本章正文" @click="sourceSwitchOpen=true">换</button>
                </div>
              </div>
            </section>
          </main>

          <footer class="detail-footer">
            <button class="footer-secondary">{{libraryIds?.has?.(selected.id)?'从内容库移除':'加入内容库'}}</button>
            <button class="footer-primary">{{primaryAction}} <span>›</span></button>
          </footer>

          <aside v-if="sourceSwitchOpen" class="source-switch-drawer">
            <div class="source-switch-head">
              <div><small>更换来源</small><strong>{{selected.title}}</strong></div>
              <button @click="sourceSwitchOpen=false">×</button>
            </div>
            <p class="source-switch-note">
              {{selected.type==='video'||selected.type==='audio'
                ? '音频和视频内容只支持整书切换来源，不支持替换单集内容。'
                : '可以切换整书来源，也可以从目录对单章正文执行替换。'}}
            </p>
            <label class="source-search"><span>⌕</span><input :value="selected.title" aria-label="来源搜索关键词"><button>重新搜索</button></label>
            <div class="candidate-list">
              <article v-for="(source,i) in sourceCandidates" :key="source.name">
                <div>
                  <strong>{{source.name}}</strong>
                  <span>{{source.author}} · {{source.latest}}</span>
                  <small>{{source.speed}}</small>
                </div>
                <button class="ghost-btn">{{i===0?'当前来源':'选择'}}</button>
              </article>
            </div>
            <div class="source-switch-actions">
              <button class="ghost-btn" @click="sourceSwitchOpen=false">取消</button>
              <button class="primary-btn">切换整书来源</button>
            </div>
          </aside>
        </article>
      </div>
    </div>
  `
}).mount("#app");
