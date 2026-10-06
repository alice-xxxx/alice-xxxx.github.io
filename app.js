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
      {id:"jianlai",type:"novel",title:"剑来",sub:"烽火戏诸侯 · 少年持剑远游",stat:"326.5 万",coverSub:"天地有大美而不言",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=86"},
      {id:"youth",type:"comic",title:"我的青春恋爱物语",sub:"校园 · 青春并不总是甜蜜",stat:"128.4 万",coverSub:"错误答案也会成为回忆",img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=86"},
      {id:"wind",type:"video",title:"去有风的地方",sub:"治愈 · 旅行 · 8.9 分",stat:"2850.1 万",coverSub:"慢一点，也没有关系",img:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=86"},
      {id:"threebody",type:"novel",title:"三体",sub:"刘慈欣 · 黑暗森林正在展开",stat:"198.3 万",coverSub:"给岁月以文明",img:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=86"},
      {id:"oshi",type:"comic",title:"我推的孩子",sub:"演艺圈 · 连载中",stat:"312.6 万",coverSub:"聚光灯背后的故事",img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=86"},
      {id:"goodnight",type:"audio",title:"晚安，陌生人",sub:"治愈系 · 每个夜晚的陪伴",stat:"86.4 万",coverSub:"今天也辛苦了",img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=86"},
      {id:"suzume",type:"video",title:"铃芽之旅",sub:"动画 · 新海诚 · 121 分钟",stat:"412.8 万",coverSub:"跨越废墟与天空",img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86"},
      {id:"mysteries",type:"novel",title:"诡秘之主",sub:"爱潜水的乌贼 · 蒸汽与神秘",stat:"520.7 万",coverSub:"Lord of Mysteries",img:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=86"},
      {id:"catnoise",type:"audio",title:"猫的白噪音",sub:"助眠 · 自然声 · 放松",stat:"214.9 万",coverSub:"安静地睡一会儿",img:"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=86"},
      {id:"blade",type:"comic",title:"镖人",sub:"武侠 · 第 11 卷",stat:"175.2 万",coverSub:"大漠里的刀光",img:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=86"}
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

    return {tab,discoverCategory,libraryCategory,search,selected,labels,categories,discoverItems,libraryItems,navItems,settingsA,settingsB,navIcon};
  },
  template:`
    <div class="app-shell">
      <aside class="side-rail">
        <button class="brand" @click="tab='discover'">L</button>
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
                  <div class="cover">
                    <img :src="item.img" :alt="item.title" loading="lazy">
                    <span class="cover-badge">{{labels[item.type]}}</span>
                    <span class="cover-copy"><small>{{item.coverSub}}</small><strong>{{item.title}}</strong></span>
                    <span v-if="item.type==='video'||item.type==='audio'" class="media-play">
                      <svg viewBox="0 0 24 24"><path d="M9.2 7.7v8.6l7-4.3-7-4.3Z" fill="currentColor"/></svg>
                    </span>
                  </div>
                  <div class="card-info">
                    <div class="card-title">{{item.title}}</div>
                    <div class="card-sub">{{item.sub}}</div>
                    <div class="card-meta"><i class="type-mark" :class="'type-'+item.type">{{labels[item.type][0]}}</i><span>{{labels[item.type]}}</span><span>·</span><span>{{item.stat}}</span></div>
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
                  <div class="cover">
                    <img :src="item.img" :alt="item.title" loading="lazy">
                    <span class="cover-badge">{{labels[item.type]}}</span>
                    <span class="cover-copy"><small>{{item.coverSub}}</small><strong>{{item.title}}</strong></span>
                    <span v-if="item.type==='video'||item.type==='audio'" class="media-play"><svg viewBox="0 0 24 24"><path d="M9.2 7.7v8.6l7-4.3-7-4.3Z" fill="currentColor"/></svg></span>
                  </div>
                  <div class="card-info">
                    <div class="card-title">{{item.title}}</div>
                    <div class="card-sub">{{item.sub}}</div>
                    <div class="card-meta"><i class="type-mark" :class="'type-'+item.type">{{labels[item.type][0]}}</i><span>{{labels[item.type]}}</span><span>·</span><span>最近浏览</span></div>
                  </div>
                </button>
              </article>
            </div>
          </section>

          <section v-else class="me-view">
            <div class="profile-row">
              <div class="avatar">L</div>
              <div class="profile-copy"><strong>Legado RS</strong><small>本地优先 · 多媒体内容聚合</small></div>
            </div>
            <div class="settings-group">
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

      <div v-if="selected" class="modal-backdrop" @click.self="selected=null">
        <div class="detail-sheet">
          <button class="close-btn" @click="selected=null">×</button>
          <div class="detail-cover"><img :src="selected.img" :alt="selected.title"></div>
          <div class="detail-copy">
            <span class="detail-type">{{labels[selected.type]}}</span>
            <h2>{{selected.title}}</h2>
            <p>{{selected.sub}}</p>
            <p style="margin-top:12px">这里是详情页交互占位。后续可以继续做简介、目录、剧集、音频列表、收藏状态和来源切换。</p>
            <div class="detail-actions">
              <button class="primary-btn">立即打开</button>
              <button class="ghost-btn">收藏</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}).mount("#app");
