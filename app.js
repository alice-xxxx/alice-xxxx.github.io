const { createApp, computed, ref } = Vue;

createApp({
  setup(){
    const tab=ref("discover");
    const discoverCategory=ref("all");
    const libraryCategory=ref("all");
    const search=ref("");
    const selected=ref(null);

    const labels={novel:"小说",comic:"漫画",video:"视频",audio:"音频"};
    const categories=[
      {value:"all",label:"全部"},
      {value:"novel",label:"小说"},
      {value:"comic",label:"漫画"},
      {value:"video",label:"视频"},
      {value:"audio",label:"音频"}
    ];

    const items=[
      {id:"jianlai",type:"novel",title:"剑来",sub:"烽火戏诸侯 · 少年持剑远游",stat:"326.5 万",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=86"},
      {id:"youth",type:"comic",title:"我的青春恋爱物语",sub:"校园 · 青春并不总是甜蜜",stat:"128.4 万",img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=86"},
      {id:"wind",type:"video",title:"去有风的地方",sub:"治愈 · 旅行 · 8.9 分",stat:"2850.1 万",img:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=86"},
      {id:"threebody",type:"novel",title:"三体",sub:"刘慈欣 · 黑暗森林正在展开",stat:"198.3 万",img:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=86"},
      {id:"oshi",type:"comic",title:"我推的孩子",sub:"演艺圈 · 连载中",stat:"312.6 万",img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=86"},
      {id:"goodnight",type:"audio",title:"晚安，陌生人",sub:"治愈系 · 每个夜晚的陪伴",stat:"86.4 万",img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=86"},
      {id:"suzume",type:"video",title:"铃芽之旅",sub:"动画 · 新海诚 · 121 分钟",stat:"412.8 万",img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86"},
      {id:"mysteries",type:"novel",title:"诡秘之主",sub:"爱潜水的乌贼 · 蒸汽与神秘",stat:"520.7 万",img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=86"},
      {id:"catnoise",type:"audio",title:"猫的白噪音",sub:"助眠 · 自然声 · 放松",stat:"214.9 万",img:"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=86"},
      {id:"blade",type:"comic",title:"镖人",sub:"武侠 · 第 11 卷",stat:"175.2 万",img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86"}
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

    const novelChapters=["第 23 章 山水之间","第 22 章 少年远游","第 21 章 有客自远方来","第 20 章 春风又绿"];
    const comicChapters=["第 84 话","第 83 话","第 82 话","第 81 话","第 80 话","第 79 话"];
    const videoEpisodes=["01 · 初到云苗村","02 · 风起的时候","03 · 山野之间","04 · 慢一点生活"];
    const audioEpisodes=["EP.42 今天也辛苦了","EP.41 雨声与失眠","EP.40 夜晚的火车","EP.39 留一点安静给自己"];

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

    return {
      tab,discoverCategory,libraryCategory,search,selected,labels,categories,
      discoverItems,libraryItems,navItems,settingsA,settingsB,navIcon,
      novelChapters,comicChapters,videoEpisodes,audioEpisodes
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
                <button class="cover-button" @click="selected=item">
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
                <button class="cover-button" @click="selected=item">
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

      <div v-if="selected" class="detail-backdrop" @click.self="selected=null">
        <section class="detail-panel" :class="'detail-'+selected.type">
          <button class="detail-close" @click="selected=null">×</button>

          <template v-if="selected.type==='novel'">
            <div class="novel-layout">
              <div class="detail-poster"><img :src="selected.img" :alt="selected.title"></div>
              <div class="novel-main">
                <span class="eyebrow">小说</span>
                <h2>{{selected.title}}</h2>
                <p class="detail-sub">{{selected.sub}}</p>
                <p class="summary">一个更偏阅读决策的详情页。这里优先展示作者、状态、简介和章节，不让播放器或大图抢占空间。</p>
                <div class="detail-actions"><button class="primary-btn">开始阅读</button><button class="ghost-btn">收藏</button></div>
              </div>
              <div class="chapter-block">
                <div class="section-line"><strong>最近章节</strong><button>全部章节</button></div>
                <button v-for="chapter in novelChapters" :key="chapter" class="list-row"><span>{{chapter}}</span><small>刚刚更新</small></button>
              </div>
            </div>
          </template>

          <template v-else-if="selected.type==='comic'">
            <div class="comic-layout">
              <div class="comic-hero">
                <div class="detail-poster"><img :src="selected.img" :alt="selected.title"></div>
                <div class="comic-copy">
                  <span class="eyebrow">漫画</span>
                  <h2>{{selected.title}}</h2>
                  <p class="detail-sub">{{selected.sub}}</p>
                  <div class="comic-meta"><span>连载中</span><span>日漫</span><span>每周更新</span></div>
                  <div class="detail-actions"><button class="primary-btn">从头阅读</button><button class="ghost-btn">收藏</button></div>
                </div>
              </div>
              <div class="section-line"><strong>选话</strong><button>倒序 ↓</button></div>
              <div class="comic-chapters">
                <button v-for="chapter in comicChapters" :key="chapter">{{chapter}}</button>
              </div>
            </div>
          </template>

          <template v-else-if="selected.type==='video'">
            <div class="video-layout">
              <div class="video-stage">
                <img :src="selected.img" :alt="selected.title">
                <button class="big-play" aria-label="播放"><svg viewBox="0 0 24 24"><path d="M8.8 6.8v10.4L17 12 8.8 6.8Z" fill="currentColor"/></svg></button>
              </div>
              <div class="video-info">
                <div>
                  <span class="eyebrow">视频</span>
                  <h2>{{selected.title}}</h2>
                  <p class="detail-sub">{{selected.sub}}</p>
                </div>
                <button class="ghost-btn">收藏</button>
              </div>
              <div class="section-line"><strong>剧集</strong><button>共 12 集</button></div>
              <div class="episode-list">
                <button v-for="(ep,i) in videoEpisodes" :key="ep" :class="{active:i===0}">
                  <span>{{ep}}</span><small>{{i===0?'正在观看':'42 分钟'}}</small>
                </button>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="audio-layout">
              <div class="audio-top">
                <div class="audio-art"><img :src="selected.img" :alt="selected.title"></div>
                <div class="audio-info">
                  <span class="eyebrow">音频</span>
                  <h2>{{selected.title}}</h2>
                  <p class="detail-sub">{{selected.sub}}</p>
                  <div class="waveform" aria-hidden="true">
                    <i v-for="n in 28" :key="n" :style="{height:(8 + (n*7)%22)+'px'}"></i>
                  </div>
                  <div class="audio-progress"><span>12:18</span><b></b><span>42:06</span></div>
                  <div class="audio-controls">
                    <button>−15</button><button class="audio-play">▶</button><button>+15</button><button class="ghost-btn">收藏</button>
                  </div>
                </div>
              </div>
              <div class="section-line"><strong>节目</strong><button>全部</button></div>
              <div class="audio-episodes">
                <button v-for="(ep,i) in audioEpisodes" :key="ep" :class="{active:i===0}">
                  <span class="ep-number">{{String(i+1).padStart(2,'0')}}</span>
                  <span class="ep-copy"><strong>{{ep}}</strong><small>{{i===0?'正在播放':'38 分钟'}}</small></span>
                  <span>›</span>
                </button>
              </div>
            </div>
          </template>
        </section>
      </div>
    </div>
  `
}).mount("#app");
