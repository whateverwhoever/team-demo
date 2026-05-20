# 安心家 · 可交互原型

> 双击 `index.html` 即可在浏览器演示。

## 主流程演示路径

```
index.html              → 首页(我的项目)
  ↓ 点「+ 新建装修项目」
new-project.html        → 3 步向导(类型 + 模式 + 户型图)
  ↓ 点「使用 demo 户型」→「开始设计」
modeling.html           → 建模阶段(户型识别 + AI 对话)
  ↓ 对话推进 → 点「进入下一步」
global-design.html      → 整体设计(风格卡片 + 颜色滑块 + 预算)
  ↓ 点「进入局部微调」
refinement.html         → 局部微调(智能提醒重头戏)
  ↓ 点「完成这间」(触发 Checklist)→ 点「返回全屋」
delivery.html           → 成品交付(5 个 Tab)
furniture.html          → 家具库(独立入口)
```

## 演示亮点

### 1. 完整宇宙对话(Persona:林可)
- 28 岁互联网运营,3 室 1 厅毛坯房,夫妻+1 孩+1 猫
- 对话脚本在 `js/chat-script.js`,涵盖建模 → 整体设计 → 局部微调全过程
- 演示时点点点就能讲完故事

### 2. 智能提醒 3 种触发(refinement 页)
- **主动提示(Toast)**:点击「调整衣柜位置」或衣柜本体 → 衣柜自动挪到窗边 → 弹出「采光受影响」黄色 toast + 画布上贴红色 badge
- **选品提示(气泡)**:点击「换床头柜款式」 → 弹「带抽屉款 + 高度齐平床垫」
- **Checklist 清单**:点画布右上「✓ 完成这间」 → 弹出 4 条原则性检查项
- **梳妆台死角提醒**:点击梳妆台 → 弹「家务死角」提示

### 3. 视觉风格
- 主色:暖橙 `#E8825B` + 奶油白底 `#FFF8F2` + 深棕字
- 圆角 16px,柔和阴影,呼应家装品牌温暖调性
- AI 消息黄色徽章 / 原则性红色警告 / 信息蓝色 / 成功绿色,分级清晰

### 4. 6 个 P0 页面
| 文件 | 对应 PRD 页面 | 关键特性 |
| --- | --- | --- |
| `index.html` | P02 首页 | hero + 项目卡 + 三大特色 |
| `new-project.html` | P03 向导 | 3 步骤动画切换 + demo 一键填充 |
| `modeling.html` | P04 建模 | SVG 户型图 + 房间高亮 + 对话播报 |
| `global-design.html` | P05 整体设计 | 风格 6 卡 + 颜色双滑块 + 预算 + 3D 占位 |
| `refinement.html` | P06 微调 | 子工作流 + 家具选中 + 3 种提醒触发 |
| `delivery.html` | P07 交付 | 5 Tab(3D漫游/平面图/提醒清单/家具清单/预算) |
| `furniture.html` | P08 家具库 | 筛选 + 网格 + 详情抽屉 + 上传卡 |

## 给视觉/原型组的二次美化建议

1. **替换占位图为高保真渲染**:`global-design.html` 和 `delivery.html` 的 3D 区可换成真实渲染图
2. **加微动效**:`furniture-card` 悬浮、`toast` 进出、`bubble` 打字效果均可加强
3. **品牌识别**:首页 logo「安」字可换成自定义图标
4. **设计 token 集中维护**:`css/tokens.css` 顶部所有色值/圆角/阴影都可一处改全部生效

## 关键文件

- 设计 tokens:[css/tokens.css](css/tokens.css)
- 共享组件(toast/modal/对话气泡):[js/shared.js](js/shared.js)
- 完整对话脚本:[js/chat-script.js](js/chat-script.js)

## 验证清单

- [x] 首页可跳新建项目
- [x] 新建项目 3 步可流转
- [x] 建模页对话脚本自动播报
- [x] 整体设计页风格卡片可切换 + toast 提醒
- [x] 微调页 3 种智能提醒均能触发
- [x] Checklist 弹窗可勾选 + 关闭
- [x] 成品页 5 Tab 切换正常 + 导出/分享 toast
- [x] 家具库筛选 + 详情抽屉
- [x] 顶栏导航全局可用
- [x] 进度条点击可在工作台 4 步间回退
