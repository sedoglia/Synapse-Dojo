import type { Locale, Passage } from '../i18n';

const ui: Locale['ui'] = {
  'app.tagline': '每天几分钟，让头脑更灵活',
  'home.how': '每天训练，测一测自己，看看进步',
  'onboard.title': '欢迎！',
  'onboard.ask': '你叫什么名字？',
  'onboard.placeholder': '你的名字',
  'onboard.go': '开始吧',

  'landing.heroTitle': '每天几分钟，让大脑更敏锐',
  'landing.heroSub': '35 项基于神经科学的认知训练练习，全方位锻炼记忆力、注意力、计算速度与反应能力。100% 免费、无广告、无需注册与密码。',
  'landing.badgeFree': '100% 免费',
  'landing.badgePrivacy': '完全隐私 · 本地存储',
  'landing.badgeScience': '循证科学支持',
  'landing.badgeOpenSource': '开源项目',
  'landing.startCardTitle': '立即开始训练',
  'landing.startCardDesc': '无需注册。输入一个昵称即可在浏览器中记录并追踪你的训练进度。',
  'landing.guestBtn': '或以访客身份体验',
  'landing.guestName': '访客',
  'landing.guideBtn': '📖 游戏指南与说明',
  'landing.howItWorks': 'Synapse Dojo 如何运作',
  'landing.pillar1Title': '每日训练计划',
  'landing.pillar1Desc': '每天精选 4 个练习，根据你的表现自适应调整难度。约需 10 分钟。',
  'landing.pillar2Title': '每日 Neuro Score 测试',
  'landing.pillar2Desc': '通过 4 项核心测试进行 3 分钟标准化评估，客观追踪大脑表现趋势。',
  'landing.pillar3Title': '自由训练馆（35 项练习）',
  'landing.pillar3Desc': '随时随地自由探索 9 大认知领域的所有练习，不断突破个人最佳纪录。',
  'landing.domainsTitle': '覆盖的 9 大认知能力领域',
  'landing.guideCtaTitle': '想深入了解每个练习背后的科学原理吗？',
  'landing.guideCtaDesc': '阅读我们的详细指南，了解全部 35 项练习的神经科学依据、益处与操作规则。',
  'landing.guideCtaBtn': '阅读完整指南',
  'landing.footerTagline': 'Synapse Dojo · 免费脑力认知训练馆',

  'guide.title': '指南与练习说明',
  'guide.subtitle': '了解 Synapse Dojo 的运作机制、应用版块及全部 35 项认知练习的深度解析',
  'guide.navSections': '应用主要版块',
  'guide.introH': '为什么要进行脑力训练？',
  'guide.introP': '大脑在一生中都具备重塑结构和建立新突触连接的非凡能力，这被称为「神经可塑性」。正如体育锻炼能够强健体魄，规律且具有挑战性的认知刺激能够延缓大脑衰老、提升专注力与工作记忆。Synapse Dojo 旨在打造高效便捷的每日脑力操：每天只需几分钟，练习难度实时根据你的水平调整，带来持久的思维敏捷。',
  'guide.planH': '🏋️ 每日训练（Plan）',
  'guide.planP': '每天，Synapse Dojo 会从不同认知领域（如速度、记忆、控制力与推理）中精选 4 项练习。练习具备实时自适应特性：答对则提升难度，犯错则降低难度，始终让你处于最佳学习区间。完成训练可积累连续天数并获取 XP 经验值以提升等级。',
  'guide.checkH': '📏 测量 Neuro Score（每日测试）',
  'guide.checkP': 'Neuro Score 是一项耗时约 4–5 分钟的标准化每日认知基准测试，全面涵盖大脑的全部 9 大认知领域（加工速度、注意力、执行功能、工作记忆、长时记忆、空间能力、逻辑推理、语言与计算以及双侧协调），每日轮换抽取各领域的代表性练习。测试得分（0–1000）为你提供长期追踪大脑状态的客观综合指标。',
  'guide.trainingH': '🧩 自由训练馆（35 项练习）',
  'guide.trainingP': '在训练馆中，你可以无限制地体验全部 35 项练习，自由专项强化薄弱能力或挑战个人最高分。',
  'guide.progressH': '📈 进度与成长数据',
  'guide.progressP': '查看你在 9 大认知能力上的雷达图谱、历史 Neuro Score 走势、已解锁的里程碑徽章以及月度出勤日历。',
  'guide.settingsH': '⚙️ 设置与隐私安全',
  'guide.settingsP': '个性化自定义界面：浅色、深色或高对比度主题，音效与震动开关，字体大小以及数据管理。Synapse Dojo 将全部数据保存在本地浏览器中，你可以随时导出 JSON 备份或无缝导入其他设备。',
  'guide.gamesH': '35 项认知练习详解',
  'guide.gameWhy': '科学益处与原理：',
  'guide.gameHow': '游戏规则与玩法：',
  'guide.faqH': '训练建议与常见疑问（FAQ）',
  'guide.faq1Q': '每天应该训练多久？',
  'guide.faq1A': '持之以恒是关键。每天 10 至 15 分钟（完成每日训练与 Neuro Score）足矣。每周坚持 4 至 5 天的效果远胜于偶尔一次长时间的高强度训练。',
  'guide.faq2Q': '我的数据和得分保存在哪里？',
  'guide.faq2A': '一切都留在你的设备上。Synapse Dojo 不需要账号和密码，也不使用跟踪 Cookie：你的分数和进度保存在浏览器里（localStorage）。只有当你加入可选的每周排行榜时，才会用一个随机昵称发送本周的概要。',
  'guide.faq3Q': '练习前有新手引导与试玩吗？',
  'guide.faq3A': '有的！每次开始练习前，都会显示清晰的操作说明，并提供不计分的新手试玩（Trial）环节，助你从容熟悉规则。',

  'home.hello': '你好，{name}！',
  'home.streak': '连续 {n} 天',
  'home.streak1': '连续 1 天',
  'home.streak0': '今天开始你的连续纪录',
  'home.check': '测量你的 Neuro Score',
  'home.checkSub': '测试全部 9 大认知领域 · 约 4 分钟 · 监测大脑清晰度',
  'home.checkDone': '今天已完成：{score}',
  'home.training': '训练馆',
  'home.trainingSub': '全部练习，按能力分类',
  'home.progress': '进度',
  'home.progressSub': '能力画像、等级和日历',
  'home.settings': '设置',

  'plan.title': '今日训练',
  'plan.titleN': '训练 {n}',
  'plan.again': '再来一组训练',
  'plan.againSub': '还想练？点这里，换 4 个其他能力的新练习',
  'plan.sub': '为你挑选的 {n} 个练习 · 难度随你的水平调整 · 约 {min} 分钟',
  'plan.progress': '已完成 {done}/{n}',
  'plan.step': '第 {i} 个练习，共 {n} 个',
  'plan.done': '训练完成！',
  'plan.doneSub': '干得好！如果还有兴趣，可以马上开始另一组训练，练习内容会不一样。',

  'common.back': '返回',
  'common.start': '开始！',
  'common.quit': '退出',
  'common.retry': '重试',
  'common.menu': '菜单',
  'common.next': '下一个',
  'common.continue': '继续',
  'common.best': '最佳',
  'common.newBest': '新纪录！',
  'common.level': '等级',
  'common.levelChange': '等级：{from} → {to}',
  'common.why': '为什么有效',
  'common.timeout': '时间到',
  'common.step': '第 {i} 项测试，共 {n} 项',
  'common.correct': '答对 {ok}/{n}',

  'domain.speed': '速度',
  'domain.attention': '注意力',
  'domain.wm': '工作记忆',
  'domain.memory': '记忆',
  'domain.executive': '控制',
  'domain.spatial': '空间',
  'domain.reasoning': '推理',
  'domain.language': '计算与阅读',

  'ex.glance.name': '一瞥',
  'ex.glance.desc': '中央会短暂出现一辆交通工具，边缘附近出现一颗星星。说出是哪种交通工具、星星在哪里。你越熟练，显示时间就越短。',
  'ex.glance.why': '训练“有效视野”：一眼看到更多东西。ACTIVE 研究使用的就是这类练习，其中处理速度训练与 10 年后较低的痴呆风险相关。',
  'ex.glance.which': '中间是哪种交通工具？',
  'ex.glance.where': '星星在哪里？',
  'ex.glance.detail': '阈值：{ms} 毫秒',

  'ex.reflex.name': '选择反应',
  'ex.reflex.desc': '四个面板中的一个会亮起。如果是绿色，立刻点它；如果是红色，什么都别碰！',
  'ex.reflex.why': '带有需要忽略的信号的选择反应时（go/no-go）：把速度与对自动反应的控制结合起来。',
  'ex.reflex.hint': '绿色：点 · 红色：别动',
  'ex.reflex.detail': '平均反应：{ms} 毫秒 · 答对 {ok}/{n}',

  'ex.path.name': '数字小路',
  'ex.path.desc': '按顺序点圆圈。到了高等级，要在数字和字母之间交替：1 → A → 2 → B → 3 …',
  'ex.path.why': '这是连线测验（Trail Making Test）的一种版本，神经心理学用它来测量快速视觉搜索，交替形式还能测量思维灵活性。',
  'ex.path.next': '下一个：{v}',
  'ex.path.detail': '{secs} 秒 · {err} 个错误',

  'ex.pilot.name': '驾驶员',
  'ex.pilot.desc': '拖动（或用方向键）控制方向，保持在路上。同时，只有在绿色圆圈经过时才按“信号”。',
  'ex.pilot.why': '灵感来自 NeuroRacer（加州大学旧金山分校）：一项发表在《自然》杂志上的研究中，自适应多任务训练降低了同时做两件事的代价，效果持续了 6 个月。',
  'ex.pilot.press': '信号！',
  'ex.pilot.detail': '正确信号：{ok}/{n} · 在路上 {road}%',

  'ex.radar.name': '雷达',
  'ex.radar.desc': '有几个球会亮起：它们就是目标。然后所有球变得一样并开始移动。用眼睛跟住它们，最后点出目标。',
  'ex.radar.why': '多目标追踪：跟踪多个移动的物体，训练分布在空间中的注意力，就像你在车流或人群中用到的那样。',
  'ex.radar.watch': '记住目标',
  'ex.radar.track': '跟住它们……',
  'ex.radar.pick': '点出 {n} 个目标',
  'ex.radar.detail': '目标：最多 {n} 个 · 答对 {ok}/{t} 轮',

  'ex.clash.name': '颜色冲突',
  'ex.clash.desc': '看上方的规则：点墨水的颜色，或点字的意思。你越熟练，回答时间就越短。',
  'ex.clash.why': '斯特鲁普效应：压住自动反应（读字），给出要求的答案。它训练抑制能力，这是核心执行功能之一。',
  'ex.clash.ruleInk': '🎨 墨水颜色',
  'ex.clash.ruleWord': '📖 字的意思',

  'ex.switch.name': '规则切换',
  'ex.switch.desc': '会出现一个数字。如果边框是蓝色，判断它是双数还是单数。如果是橙色，判断它比 5 小还是比 5 大。规则会突然变化！',
  'ex.switch.why': '任务切换：在不同规则之间快速跳转。训练能降低“切换代价”，即使是没练过的任务也一样；老年人往往进步最大。',
  'ex.switch.parity': '双数还是单数？',
  'ex.switch.size': '比 5 小还是比 5 大？',
  'ex.switch.even': '双数',
  'ex.switch.odd': '单数',
  'ex.switch.detail': '{ok}/{n} · 切换代价 {cost} 毫秒',

  'ex.echo.name': '回声',
  'ex.echo.desc': '每次亮起一个方格。对每一个都问自己：它和 N 步之前的那个在同一个位置吗？如果是，按“位置”；否则什么都不按。你从 N = 1 开始，也就是紧挨着的前一个；之后会加入一个字，用同样的方法比较。',
  'ex.echo.why': 'n-back：把每一项和 N 步之前的那一项比较。这是研究最多的工作记忆任务；在相似任务上的提升很明显，在差别较大的任务上则不太确定。',
  'ex.echo.before': '之前',
  'ex.echo.now': '现在',
  'ex.echo.ago': '{n} 步前',
  'ex.echo.demo1': '一个方格亮起：现在还没有可比较的，等着就好。',
  'ex.echo.demo2': '和前一个不同 → 什么都别按。',
  'ex.echo.demo3': '和前一个相同 → 按“位置”！',
  'ex.echo.demo4': '又不一样了 → 不要按。以此类推。',
  'ex.echo.stripWait': '记住它：你要拿它和后面的比较。',
  'ex.echo.stripCompare': '现在亮着的方格和高亮的那个在同一个位置吗？如果是，按“位置”。',
  'ex.echo.stripCompareDual': '把“现在”和高亮的那个比较：方格相同 → 位置，字相同 → 字。',
  'ex.echo.back1': '紧挨着的前一个',
  'ex.echo.backN': '{n} 步之前的那个',
  'ex.echo.dualTitle': '从现在开始是双重任务！',
  'ex.echo.dualText': '除了方格，你还会听到一个字，它也写在方格里。如果方格和{back}相同就按“位置”，如果字和{back}相同就按“字”。可能两个都相同，也可能只有一个或都不同。',
  'ex.echo.series': '第 {i} 组，共 {n} 组',
  'ex.echo.seriesStart1': '这一组有 {len} 个方格。第一个只用来记住：不要按。从第二个开始，把每个方格和紧挨着的前一个比较。',
  'ex.echo.seriesStartN': '这一组有 {len} 个方格。前 {k} 个只用来记住：不要按。之后把每个方格和 {k} 步之前的那个比较。',
  'ex.echo.turnWait': '第 {i}/{len} 个方格 · 记住它，不要按',
  'ex.echo.turnAsk': '第 {i}/{len} 个方格 · 和{back}相同吗？',
  'ex.echo.turnAskDual': '第 {i}/{len} 个方格 · 位置相同？字相同？（与{back}比较）',
  'ex.echo.seriesEnd': '第 {i} 组结束，共 {n} 组',
  'ex.echo.seriesScore': '准确率：{acc}% · 抓到相同 {hit}/{targets} · 按错 {fa} 次',
  'fb.echoNotSame': '不要按（是不同的）',
  'fb.echoNotSameLetter': '不要按（字不一样）',
  'fb.echoMissed': '要按{btn}（是相同的）',
  'ex.echo.pos': '位置',
  'ex.echo.letter': '字',
  'ex.echo.rule1': '1-back · 和紧挨着的前一个比较',
  'ex.echo.ruleDual': '{n}-back ×2 · 把方格和字与{back}比较',
  'ex.echo.rule': '{n}-back · 和 {n} 步之前比较',
  'ex.echo.block': '第 {i} 组：准确率 {acc}%（命中减去误报）',

  'ex.grid.name': '光格',
  'ex.grid.desc': '看格子依次亮起，然后重复这个顺序。注意：有时要倒着重复！',
  'ex.grid.why': '科西方块测验：记住空间中的顺序，正着和倒着。它测量并训练视觉空间工作记忆。',
  'ex.grid.watch': '看好……',
  'ex.grid.yours': '轮到你了！（{n} 个格子）',
  'ex.grid.back': '倒着来！（{n} 个格子）',
  'ex.grid.span': '最长序列：{n}',
  'ex.grid.detail': '顺序广度 {f} · 倒序广度 {b}',

  'ex.digits.name': '最后几位数',
  'ex.digits.desc': '一串长度不确定的数字依次闪过。停下时，按正确顺序输入最后 N 个数字。',
  'ex.digits.why': '动态广度：只记住一串不断更新的数字中最后几个。它训练工作记忆的更新。',
  'ex.digits.watch': '记住最后 {n} 个',
  'ex.digits.recall': '输入最后 {n} 个数字',
  'ex.digits.detail': '答对 {ok}/{n} · 广度 {span}',

  'ex.rotate.name': '旋转',
  'ex.rotate.desc': '这两个图形是同一个图形旋转后的样子，还是其中一个是另一个的镜像？',
  'ex.rotate.why': '心理旋转。一项涵盖 235 项研究的荟萃分析显示，空间能力可以通过训练提高，效果持久，并且能迁移到相似的未训练任务上。',
  'ex.rotate.same': '相同',
  'ex.rotate.mirror': '镜像',

  'ex.towers.name': '塔',
  'ex.towers.desc': '移动小球，用尽量少的步数摆成目标的样子。点一根柱子拿起最上面的球，再点要放的位置。先想后动！',
  'ex.towers.why': '伦敦塔测验：行动前先规划一系列步骤。这是规划能力（一种执行功能）的经典测验。',
  'ex.towers.goal': '目标',
  'ex.towers.moves': '步数：{m} · 最少：{min}',
  'ex.towers.too': '步数太多了',
  'ex.towers.detail': '用最少步数完成：{ok}/{n}',

  'ex.odd.name': '找不同',
  'ex.odd.desc': '除了一个，其他图形都有一个共同点（形状、颜色、填充或数量）。找出那个不一样的。',
  'ex.odd.why': '归纳推理：在无关的差异中找出隐藏的共同规律。剑桥脑科学（Cambridge Brain Sciences）的测试组合中也有类似任务。',
  'ex.odd.ask': '哪个不一样？',

  'ex.math.name': '计算冲刺',
  'ex.math.desc': '尽快解题。输入完所有数位后答案会自动提交。',
  'ex.math.why': '快速做大量简单计算：这是川岛隆太团队研究的“学习疗法”的原理，研究显示老年人的注意力、抑制能力和速度都有提升。',
  'ex.math.detail': '{ok}/{n} · {secs} 秒',

  'ex.reading.name': '快速朗读',
  'ex.reading.desc': '大声朗读文章，在发音清楚的前提下尽量快。然后回答一个问题。',
  'ex.reading.why': '大声朗读：川岛隆太团队“学习疗法”的另一半。最后的问题用来确认你真的读了。',
  'ex.reading.aloud': '🗣️ 大声朗读',
  'ex.reading.done': '读完了',
  'ex.reading.detail': '{wpm} 词/分钟（按字数换算）· 理解 {ok}/{n}',

  'ex.vault.name': '词语保险箱',
  'ex.vault.desc': '记住这些词。然后我会给你看更多的词：告诉我每个词是之前见过的，还是新的。',
  'ex.vault.why': '再认记忆：区分见过的和新的。它训练情景记忆。',
  'ex.vault.study': '记住这些词',
  'ex.vault.done': '记好了',
  'ex.vault.seen': '见过',
  'ex.vault.new': '新的',
  'ex.vault.result': '答对 {n}/{t}',

  'ex.pairs.name': '配对',
  'ex.pairs.desc': '你会看到几组由符号和词组成的配对，例如 🍎 🔗 锤子。记住它们。之后只出现符号，你要选出和它配对的词。没有声音：全部是视觉的。',
  'ex.pairs.why': '配对联想：把两样东西联系在一起，是最敏感的情景记忆任务之一。',
  'ex.pairs.study': '每个符号都有自己的词：记住谁配谁',
  'ex.pairs.tip': '之后你只会看到符号，并选出它的词。小窍门：想象一个把它们连在一起的画面，例如 {sym} +“{word}”。',
  'ex.pairs.timer': '⏱ {s} 秒',
  'ex.pairs.ask': '它和哪个词是一对？',
  'ex.pairs.detail': '记住 {ok}/{n} 对',

  'color.red': '红',
  'color.blue': '蓝',
  'color.green': '绿',
  'color.yellow': '黄',

  'result.title': '结果',
  'check.title': '你的 Neuro Score',
  'check.delta': '比上次 {d}',
  'check.first': '第一次测量已记录。明天再来吧！',
  'check.doneToday': '你今天已经测过了。明天再来测一次吧！',

  'rank.0': '火花',
  'rank.1': '电流',
  'rank.2': '电路',
  'rank.3': '神经网络',
  'rank.4': '突触大师',

  'training.title': '训练馆',
  'training.today': '今天已完成',

  'progress.title': '进度',
  'progress.chart': 'Neuro Score',
  'progress.empty': '完成第一次每日测量后就能看到图表。',
  'progress.calendar': '最近 4 周',
  'progress.domains': '能力画像',
  'progress.domainsHint': '根据每个练习达到的等级。',
  'progress.exercises': '等级和纪录',
  'progress.none': '—',
  'progress.stats': '活跃天数：{days} · 练习次数：{runs}',
  'progress.week': '本周：{n}/4 天训练',

  'settings.title': '设置',
  'settings.name': '名字',
  'settings.lang': '语言',
  'settings.sound': '音效',
  'settings.relaxed': '放松节奏（有更多时间回答）',
  'settings.bigText': '大字体',
  'settings.reset': '删除所有数据',
  'settings.resetConfirm': '确定要删除所有进度吗？此操作无法撤销。',
  'ex.glance.example': '例子：中间是 🚗，星星在右上角 → 先答 🚗，再点右上角的格子。',
  'ex.reflex.example': '例子：绿色面板亮起 → 立刻点它。如果是红色 → 什么都别碰，等着。',
  'ex.path.example': '例子：点 1，再点 2，再点 3……交替版本：1 → A → 2 → B → 3 → C。',
  'ex.pilot.example': '例子：拖动以沿着路走。绿色圆圈经过 → 按“信号”。三角形或方形 → 不用管。',
  'ex.radar.example': '例子：2 个球亮起 → 在它们和其他球混在一起时用眼睛跟住，然后正好点这 2 个。',
  'ex.clash.example': '例子：用蓝色写的“红”字 → 按 🎨 规则答“蓝”，按 📖 规则答“红”。',
  'ex.switch.example': '例子：蓝框里的 7 → 单数。同一个 7 在橙框里 → 比 5 大。',
  'ex.echo.example': '1-back 例子：上方的方格亮起，紧接着同一个又亮起 → 按“位置”。如果是另一个 → 不要按。',
  'ex.grid.example': '例子：1 → 2 → 3 依次亮起。点 1、2、3。如果写着“倒着来”，就点 3、2、1。',
  'ex.digits.example': '例子：闪过 4 8 1 7 2 9，你要记住最后 3 个 → 输入 7 2 9。',
  'ex.vault.example': '例子：你记了“树”和“船”。出现“树” → 见过。出现“杯子” → 新的。',
  'ex.pairs.example': '例子：你看到了 🍎 – 锤子 这一对。之后出现 🍎 → 选“锤子”。',
  'ex.rotate.example': '例子：如果把右边的图形旋转后能得到左边的 → 相同。如果需要镜子才行 → 镜像。',
  'ex.towers.example': '例子：目标中红球在最上面，但现在蓝球压着它 → 先移开蓝球，再把红球放到位。',
  'ex.odd.example': '例子：三个实心红圆和一个实心蓝圆 → 不一样的是蓝色那个（唯一不同的颜色）。',
  'ex.math.example': '例子：7 + 8 = → 输入 15。输入完所有数位后答案会自动提交。',
  'ex.reading.example': '例子：大声读出文章，按“读完了”，然后回答相关问题。',
  'fb.pilotRoad': '标志快到时要保持在路上',
  'fb.pilotMissed': '那是绿色圆圈：按“信号”',
  'fb.pilotNotTarget': '只在绿色圆圈出现时按',
  'fb.pilotStray': '现在没有标志：等绿色圆圈出现',
  'fb.oddHere': '用绿色标出的那个',
  'fb.gridOrder': '格子上标出的数字顺序',
  'fb.right': '答对了！',
  'fb.wrong': '答错了',
  'fb.was': '正确答案：{v}',
  'fb.noGo': '是红色，不要点',
  'fb.tooSlow': '太慢了，要早点点',
  'fb.otherPad': '亮着的面板',
  'fb.starHere': '星星在现在发光的位置',
  'fb.minMoves': '本可以用 {n} 步完成',
  'intro.tip': '游戏会根据你调整难度：你大约每五题会错一题，而大脑恰恰在这个时候学得最多。',
  'intro.practice': '引导练习',
  'intro.practiceFirst': '第一次玩？试试引导练习：很短，不计分。',
  'practice.tag': '练习',
  'practice.done': '练习完成！',
  'practice.doneSub': '现在你懂规则了。准备好来真的了吗？',
  'result.accuracy': '准确率：{pct}%',
  'result.combo': '最佳连对：×{n}',
  'result.msgUp': '你在进步：接下来游戏会稍微难一点。',
  'result.msgDown': '等级稍微降低了一点，让你在合适的难度上训练。这很正常！',
  'result.msgSame': '等级稳定：你在巩固。继续保持。',
  'result.history': '你的等级变化',
  'result.sinceFirst': '比第一次 {pct}',
  'result.newBadge': '新成就！',
  'level.player': '{n} 级',
  'level.up': '你升到了 {n} 级！',
  'home.next': '下一个成就',
  'home.week': '每周目标：{n}/4 天',
  'badges.title': '成就',
  'badges.count': '已获得 {n}/{t}',
  'settings.vibration': '振动（手机上）',
  'settings.reminder': '每日提醒',
  'settings.reminderHint': '下载一个重复事件，添加到手机或电脑的日历中。',
  'settings.reminderTime': '时间',
  'settings.reminderBtn': '添加到日历',
  'reminder.desc': '花几分钟锻炼一下头脑',
  'badge.first.name': '第一步',
  'badge.first.desc': '完成第一个练习',
  'badge.check.name': '第一次测量',
  'badge.check.desc': '第一次测量你的 Neuro Score',
  'badge.plan.name': '完整训练',
  'badge.plan.desc': '完成一次每日训练',
  'badge.streak3.name': '连续三天',
  'badge.streak3.desc': '连续训练 3 天',
  'badge.week4.name': '充实一周',
  'badge.week4.desc': '同一周内训练 4 天',
  'badge.streak7.name': '火热一周',
  'badge.streak7.desc': '连续训练 7 天',
  'badge.combo10.name': '闪电',
  'badge.combo10.desc': '连续答对 10 题',
  'badge.explorer.name': '探索者',
  'badge.explorer.desc': '尝试全部 35 个练习',
  'badge.balanced.name': '全面发展',
  'badge.balanced.desc': '7 天内训练全部 9 项能力',
  'badge.levelups25.name': '步步高升',
  'badge.levelups25.desc': '升级 25 次',
  'badge.plans10.name': '坚持不懈',
  'badge.plans10.desc': '完成 10 次每日训练',
  'badge.combo25.name': '风暴',
  'badge.combo25.desc': '连续答对 25 题',
  'badge.nback3.name': '深远回声',
  'badge.nback3.desc': '在“回声”中达到 3-back',
  'badge.span7.name': '钢铁记忆',
  'badge.span7.desc': '在“光格”中达到广度 7',
  'badge.glance50.name': '鹰眼',
  'badge.glance50.desc': '在“一瞥”中降到约 100 毫秒',
  'badge.neuro800.name': '神经网络',
  'badge.neuro800.desc': 'Neuro Score 至少达到 800',
  'badge.streak30.name': '相伴一个月',
  'badge.streak30.desc': '连续训练 30 天',
  'settings.about': '开源的大脑训练游戏。仅供娱乐：不是医疗工具。运动、睡眠和社交生活对大脑也有好处。',
  'settings.data': '你的进度',
  'settings.dataHint': '把进度保存到一个文件，可以留作备份，或转移到另一台设备或游戏的另一个网址：每个地方都有各自的存档。',
  'settings.export': '导出进度',
  'settings.import': '导入进度',
  'settings.importBad': '这个文件不是有效的 Synapse Dojo 存档。',
  'settings.importConfirm': '用文件中的数据替换当前数据吗？（{name}，已完成 {runs} 次练习，最近一次是 {last}）当前进度将会丢失。',
  'settings.importDone': '进度已导入。',
  'privacy.title': '隐私与法律声明',
  'privacy.updated': '最后更新：2026 年 11 月 3 日',
  'privacy.dataH': '你的数据留在你的设备上',
  'privacy.data': '你的名字、进度和设置只保存在这台设备的浏览器里（localStorage）。它们从不发送到任何服务器（如果你加入可选的排行榜，则发送每周概要，见下文），任何人，包括游戏的运营者，都看不到。清除浏览器数据或使用“删除所有数据”后它们就会消失：你可以在设置中用“导出进度”保留一份副本。',
  'privacy.cookiesH': '没有账号，没有 Cookie',
  'privacy.cookies': '无需注册，游戏不使用 Cookie、广告或用户画像工具。字体和游戏文件都由同一个网站提供，不使用第三方服务。',
  'privacy.hostingH': '托管',
  'privacy.hosting': '公开版本由 Cloudflare 托管（Cloudflare Pages）。和任何网络服务器一样，为了提供网页并防御攻击，Cloudflare 会按照其隐私政策处理你的 IP 地址和浏览器类型等技术数据。',
  'privacy.statsH': '访问统计',
  'privacy.stats': '仅在公开版本中，我们使用 Cloudflare Web Analytics 统计访问量。它不使用 Cookie，不在你的浏览器中保存任何内容，也不跨网站追踪用户：只显示页面浏览量、国家和设备类型等汇总数据。名字和练习结果从不发送。',
  'privacy.boardH': '可选的每周排行榜',
  'privacy.board': '只有当你在设置中加入后，游戏才会在每次训练后向自己的服务器（使用 D1 数据库的 Cloudflare Workers）发送本周概要：训练的天数和每天的训练次数、每个练习的等级变化和最高等级、是否使用放松节奏，以及你选择填写的年龄段。概要与一个随机标识符和一个自动生成的昵称关联，绝不会与你的名字、邮箱或其他进度关联。如果你创建或加入好友小组，服务器还会保存小组名称和成员名单，只有成员能看到。加入时，Cloudflare Turnstile 会按照 Cloudflare 的隐私政策确认你不是机器人。每周结果在 8 周后删除，其余数据在 90 天未使用后删除；“退出并删除我的数据”或“删除所有数据”会立即删除，没有成员的小组也会被删除。法律依据是你的同意，你可以随时退出排行榜来撤回。',
  'privacy.medicalH': '不是医疗器械',
  'privacy.medical': 'Synapse Dojo 是一款娱乐游戏。它不是医疗器械，不做任何诊断，也不承诺预防、延缓或治疗痴呆、认知衰退或任何其他健康问题。分数只反映你在练习中的表现。如有健康方面的疑问，请咨询医生。',
  'privacy.contactH': '联系方式',
  'privacy.contact': '关于游戏或你的数据的问题：{contact}',
  'privacy.open': '打开游戏',

  'license.title': '许可与条款',
  'license.subtitle': '软件许可、允许的用途及版权条款',
  'license.authorH': '作者与知识产权',
  'license.authorP': 'Synapse Dojo 是由 Sergio Dogliani 创建的原创独立项目。保留所有商业权利。',
  'license.polyformH': 'PolyForm Noncommercial 1.0.0 许可证',
  'license.polyformP': '本软件采用 PolyForm Noncommercial 1.0.0 许可证发布。您可以自由查看源代码、运行并用于个人学习、教育、研究和非商业目的。严禁任何未经授权的商业使用、转售、营利或二次分发。',
  'license.permittedH': '允许的用途',
  'license.permittedP': '个人学习、认知训练、非商业学术研究、测试以及无商业意图的私人娱乐。',
  'license.restrictedH': '商业限制',
  'license.restrictedP': '未经作者书面商业许可，不得将本软件用于获取金钱报酬、商业竞争优势、广告投放，或将其整合到收费的商业产品中。',
  'license.fontsH': '字体与素材',
  'license.fontsP': 'Nunito 字体遵循 SIL Open Font License 1.1 许可。心理学认知训练范式属于公有领域。',
  'license.linksH': '官方链接与文档',
  'license.officialLink': '阅读 PolyForm Noncommercial 1.0.0 官方文本',
  'license.repoLink': '在 GitHub 上查看 LICENSE 文件',
  'license.open': '打开游戏',

  'domain.coordination': "协调能力",
  'shape.circle': "圆形",
  'shape.square': "正方形",
  'shape.triangle': "三角形",
  'shape.diamond': "菱形",
  'ex.span.name': "数字广度",
  'ex.span.desc': "按要求顺序记忆并输入呈现的数字序列",
  'ex.span.why': "数字广度是评估言语工作记忆与短时记忆容量的经典神经心理学范式。",
  'ex.span.example': "4 8 1 9   按顺向或逆向输入数字",
  'ex.span.forward': "顺向",
  'ex.span.backward': "逆向",
  'ex.span.watch': "记忆 {n} 位数字",
  'ex.span.recallFor': "按原顺序输入数字",
  'ex.span.recallBack': "倒序输入数字！",
  'ex.span.detail': "正确 {ok}/{n} · 广度 {span}",
  'ex.stories.name': "情景记忆",
  'ex.stories.desc': "阅读简短生活场景并回忆情节细节",
  'ex.stories.why': "情景记忆将人物、地点与事件深度结合，锻炼海马体介导的叙事记忆提取。",
  'ex.stories.example': "仔细阅读短文，然后回答关于细节的提问",
  'ex.stories.title': "场景 {n}",
  'ex.stories.ready': "已读完，开始！",
  'ex.stories.qItem': "{name} 当时携带了什么物品？",
  'ex.stories.qPlace': "{name} 在什么地点？",
  'ex.stories.qTime': "事件发生在什么时间？",
  'ex.stories.detail': "细节正确 {ok}/{n}",
  'ex.stories.text': '{name} 随身携带着 {item}。当时位于 {place} {time}，并在那里完成了事项。',
  'ex.anagrams.letters': '字母',
  'ex.resources.task8': '数据备份',
  'ex.resources.task7': '数据分析',
  'ex.resources.task6': '交互界面',
  'ex.resources.task5': '网络架构',
  'ex.resources.task4': 'AI核心',
  'ex.resources.task3': '安全防护',
  'ex.resources.task2': '数据库',
  'ex.resources.task1': '服务器',
  'ex.resources.confirm': '确认选择',
  'ex.resources.value': '⭐ 价值: {val} (目标: {target})',
  'ex.resources.budget': '⚡ 预算: {cost}/{budget}',
  'ex.reaction.target': '目标: < {ms} 毫秒',
  'result.timeBonusPts': '时间分',
  'result.speedBonus': '速度奖励 (+10 XP)',
  'ex.flanker.name': "侧抑测试 (Flanker)",
  'ex.flanker.desc': "关注中心箭头方向，忽略两侧干扰箭头",
  'ex.flanker.why': "Eriksen Flanker 范式专门评估选择性注意力及抑制周围干扰刺激的能力。",
  'ex.flanker.example': "← ← → ← ←   目标为中心箭头 (→)",
  'ex.flanker.instruction': "点击中心箭头的指向",
  'ex.flanker.detail': "正确 {ok}/{n} · {ms} 毫秒",
  'ex.gonogo.name': "Go / No-Go 抑制",
  'ex.gonogo.desc': "绿色目标快速点击，红色停止信号坚决不点",
  'ex.gonogo.why': "训练动作抑制控制与前额叶皮层对冲动反应的压制能力。",
  'ex.gonogo.example': "● = 快速点击！   ✕ = 请勿点击！",
  'ex.gonogo.hint': "见 ● 点击，见 ✕ 停住",
  'ex.gonogo.detail': "正确 {ok}/{n} · {ms} 毫秒",
  'ex.msit.name': "多源冲突干扰 (MSIT)",
  'ex.msit.desc': "找出与其他两个不同的数字，忽略其所在位置",
  'ex.msit.why': "MSIT 范式通过数字大小与空间位置的冲突激活前扣带回皮层。",
  'ex.msit.example': "1 2 1   不同的数字是 2",
  'ex.msit.hint': "哪一个数字与众不同？",
  'ex.msit.detail': "正确 {ok}/{n} · {ms} 毫秒",
  'ex.binding.name': "颜色与形状整合",
  'ex.binding.desc': "找出同时具备指定颜色与形状的目标物品",
  'ex.binding.why': "特征捆绑要求视觉皮层将独立的形状与色彩通道融合为统一感知。",
  'ex.binding.example': "在蓝色方块与红色圆圈中找到蓝色圆圈",
  'ex.binding.find': "寻找",
  'ex.binding.detail': "正确 {ok}/{n}",// sorting
  'ex.sorting.name': '卡片分类',
  'ex.sorting.desc': '根据反馈推断隐藏的分类规则（颜色、形状或数量），并在规则改变时及时调整',
  'ex.sorting.why': '灵感源自威斯康星卡片分类测验（WCST），锻炼认知灵活性、规则归纳能力及注意力转换。',
  'ex.sorting.example': '有3个红色三角形的卡片：按形状、颜色或数量进行匹配。通过试错发现规则！',
  'ex.sorting.hint': '按颜色、形状或数量匹配。隐藏规则会定期改变！',
  'ex.sorting.detail': '{ok}/{n} 正确 · 完成 {cats} 个规则',
  'ex.sorting.secretRule': '找出隐藏规则',
  'ex.sorting.dimColor': '颜色',
  'ex.sorting.dimShape': '形状',
  'ex.sorting.dimCount': '数量',
  'ex.sorting.refLabel': '参考卡片（点击进行匹配）',
  'ex.sorting.targetLabel': '待匹配卡片',
  'ex.sorting.feedbackStart': '尝试猜测：点击卡片以测试颜色、形状或数量',
  'ex.sorting.correct': '正确！规则已确认',
  'ex.sorting.wrong': '错误！当前并非该规则',
  'ex.sorting.ruleShifted': '规则已改变！请寻找新的匹配标准',
  'ex.sorting.lostRule': '规则中断！请保持已发现的标准',
  'ex.sorting.perseveration': '注意：该规则之前已被排除！',
  'ex.sorting.eliminated': '已排除：{dim}不是目标规则',

  
  'ex.resources.name': "资源规划",
  'ex.resources.desc': "在有限能量预算内合理分配任务，获得最大总收益",
  'ex.resources.why': "背包问题式约束规划激发前额叶执行优化、得失权衡与战略预判。",
  'ex.resources.example': "选择任务组合，在不超预算前提下赢取最高积分",
  'ex.resources.detail': "完成 {ok}/{n}",
  'ex.reaction.name': "简单反应时",
  'ex.reaction.desc': "屏幕变绿瞬间以最快速度点击",
  'ex.reaction.why': "测量纯粹的视知觉-运动神经传导速度与警觉状态，无决策延迟。",
  'ex.reaction.example': "等待绿色信号，随后立刻点击",
  'ex.reaction.ready': "准备好",
  'ex.reaction.wait': "等待变绿...",
  'ex.reaction.tapNow': "立即点击！",
  'ex.reaction.early': "抢跑了！",
  'ex.reaction.penalty': "请务必等待绿色信号出现",
  'ex.reaction.detail': "平均: {ms} 毫秒 · 最佳: {best} 毫秒 ({ok}/{n})",
  'ex.dots.name': "点群数量估算",
  'ex.dots.desc': "不用逐个计数，瞬间判断哪一侧圆点数量更多",
  'ex.dots.why': "锻炼近似数量系统 (ANS)：不用数数，一眼看出哪一组更多，这依靠顶叶对数量的表征。",
  'ex.dots.example': "快速点击圆点更多的一侧",
  'ex.dots.hint': "哪一侧的点更多？",
  'ex.dots.left': "左侧",
  'ex.dots.right': "右侧",
  'ex.dots.detail': "正确 {ok}/{n}",
  'ex.anagrams.name': "词语重组",
  'ex.anagrams.desc': "重新排列打乱的字母组成正确词汇",
  'ex.anagrams.why': "锻炼字形工作记忆、词汇心理词典检索与音位重组能力。",
  'ex.anagrams.example': "按正确顺序点击字母拼出单词",
  'ex.anagrams.hint': "点击字母拼出正确词语",
  'ex.anagrams.detail': "解决 {ok}/{n}",
  'ex.fluency.name': "词汇冲刺",
  'ex.fluency.desc': "快速判断并确认以目标首字母开头的词汇",
  'ex.fluency.why': "快速字形判断：在时间压力下读出单词并判断它的首字，锻炼快速识别词语和选择答案的能力。（这是快速分类任务，而不是需要自己说出词语的言语流畅性测验。）",
  'ex.fluency.example': "若词语以指定首字母开头则快速点击",
  'ex.fluency.targetLetter': "目标首字母：",
  'ex.fluency.detail': "正确 {ok}/{n}",// matrix
  'ex.matrix.name': '空间矩阵',
  'ex.matrix.desc': '记住蓝色方块的位置，并在心理旋转后重新放置它们',
  'ex.matrix.why': '锻炼心理旋转与空间坐标转换能力，强化顶叶-额叶神经网络。',
  'ex.matrix.example': '记住图案并在心理旋转后放置方块',
  'ex.matrix.memorize': '记住蓝色方块',
  'ex.matrix.itemsToRemember': '需要记忆的方块',
  'ex.matrix.same': '点击之前点亮的格子',
  'ex.matrix.noRot': '原位置（无旋转）',
  'ex.matrix.rot90': '顺时针旋转90°：点击方块当前所在位置',
  'ex.matrix.rot90Badge': '顺时针90°',
  'ex.matrix.rot180': '旋转180°：点击方块当前所在位置',
  'ex.matrix.rot180Badge': '旋转180°',
  'ex.matrix.rot270': '逆时针旋转90°：点击方块当前所在位置',
  'ex.matrix.rot270Badge': '逆时针90°',
  'ex.matrix.detail': '{ok}/{n} 正确',
  'ex.matrix.confirm': '确认 ({sel}/{n})',

  
  'ex.tapSeq.name': "双侧交替律动",
  'ex.tapSeq.desc': "协调左右拇指复现快速交替的按键节奏",
  'ex.tapSeq.why': "双侧交替运动激活双侧大脑运动皮层，通过胼胝体强化半球间信息传递。",
  'ex.tapSeq.example': "◀ ▶ ◀ ▶   双拇指配合跟上节奏",
  'ex.tapSeq.hint': "按提示顺序交替点击左右侧",
  'ex.tapSeq.detail': "完成 {ok}/{n} 组序列",
  'ex.swipePattern.name': "双侧协同滑动",
  'ex.swipePattern.desc': "双手拇指同时朝指定方向滑动",
  'ex.swipePattern.why': "双手方向性手势训练空间解耦与非对称双侧肢体动作协调。",
  'ex.swipePattern.example': "左拇指向上滑 ↑，右拇指向下滑 ↓",
  'ex.swipePattern.hint': "双手同时执行滑动动作",
  'ex.swipePattern.detail': "正确 {ok}/{n} 组手势",
  'ex.rhythm.name': "双侧节拍同步",
  'ex.rhythm.desc': "跟随节拍器节奏精确交替敲击左右按键",
  'ex.rhythm.why': "双侧节拍协调调动小脑与辅助运动区以达到毫秒级的时间精确度。",
  'ex.rhythm.example': "左右手随节拍交替击打",
  'ex.rhythm.hint': "按提示手准时敲击节拍点",
  'ex.rhythm.detail': "踩准 {ok}/{n} · 平均偏差 {ms} 毫秒",
  'ex.crossMove.name': "跨中线反应",
  'ex.crossMove.desc': "跨越身体中线：在对侧按键响应刺激",
  'ex.crossMove.why': "跨越中线迫使神经冲动跨越胼胝体传输，训练对侧身体神经整合。",
  'ex.crossMove.example': "左侧出现信号 + \"交叉\" -> 点击右侧按钮",
  'ex.crossMove.same': "同侧：点击对应侧按钮",
  'ex.crossMove.cross': "跨越对侧：点击相反侧按钮！",
  'ex.crossMove.detail': "正确 {ok}/{n} · {ms} 毫秒",
  'ex.dualTask.name': "双侧双重任务",
  'ex.dualTask.desc': "左手持续按住稳定键，右手同时进行快速认知判断",
  'ex.dualTask.why': "双重任务范式专门激发大脑半球注意分散与不对称运动控制。",
  'ex.dualTask.example': "左手长按不放，右手大拇指判断数字单双",
  'ex.dualTask.hint': "在判断单数/双数时请持续按住左侧按键",
  'ex.dualTask.hold': "长按保持 (左)",
  'ex.dualTask.even': "双数",
  'ex.dualTask.odd': "单数",
  'ex.dualTask.notHolding': "左侧按键未持续按住！",
  'ex.dualTask.detail': "正确 {ok}/{n}",

  'board.title': '每周排行榜',
  'board.nick': '{adj}{animal} {n}',
  'board.tab.days': '坚持',
  'board.tab.improvement': '进步',
  'board.tab.best': '最高等级',
  'board.explain.days': '每训练一天得 10 分，每完成一个练习或 Neuro check 再加 1 分，每天最多 12 分（三次训练）。最重要的是把训练分散到一周的每一天。',
  'board.explain.improvement': '你的等级比本周开始时提高了多少：每个人都和自己的起点比。新练习从它的第一个等级算起。',
  'board.explain.best': '你本周在某个练习中的最高等级。',
  'board.explain.relaxed': '你使用放松节奏，所以和其他放松节奏的玩家一起排名。',
  'board.value.improvement': '{v} 分',
  'board.allExercises': '全部练习',
  'board.exercise': '练习',
  'board.ageBand': '年龄段',
  'board.band.all': '所有年龄',
  'board.band.u30': '30 岁以下',
  'board.band.30-49': '30–49 岁',
  'board.band.50-64': '50–64 岁',
  'board.band.65-74': '65–74 岁',
  'board.band.75+': '75 岁及以上',
  'board.you': '你',
  'board.players': '本周 {n} 位玩家',
  'board.reset': '每周一开始新的一周：所有人都从零开始。',
  'board.empty': '本周这里还没有人。去训练，成为第一个吧！',
  'board.notYet': '你还不在这个排行榜上：本周训练一下就会出现。',
  'board.loading': '加载中…',
  'board.err.offline': '没有网络连接。联网后再试一次。',
  'board.err.human_check': '人机验证没有通过，请再试一次。',
  'board.err.server': '出了点问题，请稍后再试。',
  'home.board': '每周排行榜',
  'home.boardSub': '坚持与进步，一周又一周',
  'home.boardRank': '坚持：本周 {n} 人中第 {rank} 名',
  'settings.board': '每周排行榜',
  'settings.boardHint': '可选。每周和其他玩家比一比你训练得有多勤、进步有多大。只会用随机昵称发送本周概要（训练天数、等级变化、每个练习的最高等级）：没有名字、邮箱或账号。你可以随时退出，所有数据都会被删除。',
  'settings.boardAge': '年龄段（可选，用来和同龄人比较）',
  'settings.boardNoAge': '不想透露',
  'settings.boardJoin': '加入排行榜',
  'settings.boardJoining': '正在加入…',
  'settings.boardMember': '你在排行榜上的昵称是 {name}。',
  'settings.boardOpen': '打开排行榜',
  'settings.boardRename': '换个昵称',
  'settings.boardLeave': '退出并删除我的数据',
  'settings.boardLeaveConfirm': '退出排行榜？你的成绩将从服务器上删除。',

  'board.value.points': '{n} 分',
  'board.detail.days': '{days} 天 · {n} 次',
  'board.players1': '本周 1 位玩家',
  'board.scope': '排行榜',
  'board.scope.all': '所有人',
  'board.groups': '小组',
  'groups.title': '好友小组',
  'groups.hint': '创建一个小组，把链接或邀请码发给家人和朋友：只有成员能看到小组和它的排行榜。',
  'groups.empty': '你还没有加入任何小组。',
  'groups.members': '{n} 位成员',
  'groups.members1': '1 位成员',
  'groups.code': '邀请码 {code}',
  'groups.open': '排行榜',
  'groups.invite': '邀请',
  'groups.copied': '邀请已复制：粘贴到消息里发出去吧。',
  'groups.inviteText': '来 Synapse Dojo 和我一起训练吧！加入我的小组“{name}”：{url}',
  'groups.leave': '退出',
  'groups.leaveConfirm': '退出小组“{name}”？',
  'groups.create': '创建小组',
  'groups.namePlaceholder': '小组名称（例如：家人）',
  'groups.createBtn': '创建',
  'groups.join': '用邀请码加入',
  'groups.codePlaceholder': '邀请码',
  'groups.joinBtn': '加入',
  'groups.err.not_found': '没有使用这个邀请码的小组。',
  'groups.err.limit': '你加入的小组已达上限（10 个）。',
  'groups.err.full': '这个小组已满（100 位成员）。',
  'groups.err.bad_name': '请取一个 1 到 30 个字符的名字。',
  'groups.err.not_member': '你已不在这个小组中。',
  'invite.title': '邀请你加入“{name}”',
  'invite.text': '要加入这个小组，请先参加每周排行榜：参加是可选的，你可以随时退出。',
  'invite.textMember': '加入小组，每周和他们比一比。',
  'invite.join': '加入小组',
  'invite.dismiss': '不用了，谢谢',
  'prompt.title': '每周排行榜',
  'prompt.text': '想和其他玩家，或在私人小组里和朋友，比一比你的坚持和进步吗？这完全是可选的：想参加再参加，随时都能退出。',
  'prompt.join': '了解更多',
  'prompt.later': '以后再说',
  'prompt.never': '不再询问',
  'settings.boardGroups': '好友小组',
};

const words: string[] = [
  "树", "船", "蜡烛", "海豚", "大象", "蝴蝶", "冰淇淋", "岛屿", "台灯", "高山",
  "云朵", "雨伞", "钢琴", "笔记本", "火箭", "椅子", "鼓", "鸡蛋", "火山", "背包",
  "戒指", "自行车", "枕头", "龙", "剪刀", "长颈鹿", "钥匙", "柠檬", "锤子", "轮船",
  "时钟", "企鹅", "蜘蛛", "镜子", "杯子", "小提琴", "城堡", "草莓", "海鸥", "狼",
  "奖牌", "鸟窝", "锅", "鞋子", "火车", "行李箱", "彗星", "灯塔", "橡果", "面包",
  "砖头", "马", "帐篷", "海绵", "梨", "瓶子", "王冠", "风筝", "河流", "星星",
  "一心一意", "十全十美", "画龙点睛", "望子成龙", "守株待兔", "井底之蛙", "自相矛盾", "胸有成竹", "掩耳盗铃", "狐假虎威",
  "拔苗助长", "亡羊补牢", "对牛弹琴", "四海为家", "风和日丽", "春暖花开", "生龙活虎", "千方百计", "一举两得", "五颜六色",
  "百花齐放", "欣欣向荣", "金玉良言", "名扬四海", "日积月累", "全力以赴", "熟能生巧", "水落石出", "天衣无缝", "万象更新",
  "小巧玲珑", "一见钟情", "引人入胜", "争先恐后", "志同道合", "蒸蒸日上", "乘风破浪", "繁花似锦", "光彩夺目", "鸟语花香",
  "聚精会神", "妙趣横生", "气象万千", "神采飞扬", "滔滔不绝", "望尘莫及", "心旷神怡", "绚丽多彩", "循序渐进", "孜孜不倦",
  "太阳", "大海", "大地", "大雁", "大桥", "大厦", "大陆", "大漠", "小溪", "小麦",
  "小舟", "小鸟", "小径", "小草", "小鹿", "小猫", "天空", "天气", "天使", "天文",
  "天桥", "天鹅", "天平", "天幕", "月亮", "月光", "月牙", "月季", "月饼", "月桂",
  "月蚀", "月台", "星空", "星光", "星座", "星辰", "星系", "星云", "星斗", "星盘",
  "金鱼", "金子", "金库", "金雕", "金针", "金币", "金殿", "金榜", "水晶", "水车",
  "水珠", "水手", "水鸟", "水果", "水库", "水滴", "山脉", "山谷", "山峰", "山泉",
  "山洞", "山丘", "山涧", "山崖", "花瓣", "花园", "花瓶", "花束", "花蕾", "花篮",
  "花蕊", "花海", "风车", "风暴", "风铃", "风帆", "风潮", "风扇", "风衣", "风景",
  "雪花", "雪人", "雪山", "雪原", "雪松", "雪豹", "雪橇", "雪莲", "白云", "白马",
  "白鹅", "白鹭", "白鲸", "白兔", "白鸽", "白鹿", "青草", "青蛙", "青松", "青竹",
];

const passages: Passage[] = [
  {
    text: "白石岛上的灯塔第一次点亮，是在一八九一年一个起雾的夜晚。看守人是一位名叫阿瑟的老渔民，他每天两次爬上塔里的一百三十级台阶，去擦拭透镜，并给让灯光旋转的机械上发条。暴风雨的夜里他从不睡觉，而是守在塔顶看着大海，身边只有一壶咖啡和一台旧收音机。在他四十年的工作中，岛附近没有一艘船沉没。",
    question: "这座塔有多少级台阶？",
    answers: [
      "一百三十级",
      "三百级",
      "九十一级",
    ],
  },
  {
    text: "找到一片好花田的蜜蜂会飞回蜂巢，跳一种特别的舞蹈。舞蹈和竖直方向形成的角度，表示食物相对于太阳的方向；而舞蹈持续的时间，表示食物有多远。其他蜜蜂用触角感受这些动作，然后径直飞向指示的地点。这样，一只侦察蜂就能带领成百上千的同伴。",
    question: "舞蹈持续的时间表示什么？",
    answers: [
      "食物的距离",
      "花的种类",
      "一天中的时间",
    ],
  },
  {
    text: "玛尔塔决定学做面包。第一个面包出炉时硬得像石头，第二个中间还是生的。到第三次她终于明白了问题所在：厨房太冷，面团发不起来。从那以后，她把面团盖上布，放在暖气旁边醒发。每到星期天，邻居们都会被香味吸引过来敲她的门。",
    question: "玛尔塔的面包为什么做不好？",
    answers: [
      "厨房太冷了",
      "她放了太多盐",
      "烤箱坏了",
    ],
  },
  {
    text: "在山区，海拔每升高一千米，气温平均下降大约六点五度。所以即使在盛夏，最高的山峰上也有积雪。有经验的登山者即使山谷里很热，背包里也总会带一件毛衣。风也会让人感觉比温度计显示的冷得多。",
    question: "海拔每升高一千米，气温下降多少？",
    answers: [
      "大约六点五度",
      "大约两度",
      "大约十五度",
    ],
  },
  {
    text: "在小村庄谷泉，每周四广场上都有集市。最受欢迎的摊位既不是水果摊，也不是奶酪摊，而是以利亚的摊位。他修理钟表和收音机已经四十年了。人们把别人都不会修的旧机器拿给他，他拿着放大镜和镊子，几乎总能让它们重新运转。",
    question: "以利亚是做什么的？",
    answers: [
      "修理钟表和收音机",
      "卖奶酪",
      "种水果",
    ],
  },
  {
    text: "章鱼有三颗心脏和蓝色的血液。两颗心脏把血液泵向鳃，第三颗把血液送到身体其他部位。章鱼还是伪装大师：靠着皮肤里特殊的细胞，它能在不到一秒内改变颜色，用来隐藏自己或互相交流。有些章鱼甚至会带着椰子壳到处走，当作随身的藏身处。",
    question: "章鱼有几颗心脏？",
    answers: [
      "三颗",
      "一颗",
      "八颗",
    ],
  },
  {
    text: "伦敦出租车司机为了通过严苛的“知识考试”，必须把两万五千多条街道和数千处地标烂熟于心。脑部核磁共振扫描研究显示，这种日复一日极其繁重的空间导航训练，使他们负责空间记忆和定向的脑区——后海马体发生了显著的物理增大。",
    question: "伦敦出租车司机的哪个脑部区域会因严苛训练而显著增大？",
    answers: [
      "后海马体",
      "初级运动皮层",
      "左前额叶",
    ],
  },
  {
    text: "壁虎能够在垂直光滑的玻璃窗上飞檐走壁，甚至仅凭单脚倒挂在天花板上。这一神奇本领并非依靠胶水或吸盘，而是源自其脚趾上数百万根被称为“匙突”的微观刚毛。这些极细的刷毛与物体表面分子极度接近，从而产生了微弱但极为紧密的范德华引力。",
    question: "壁虎能够紧紧吸附在光滑玻璃表面的物理力量是什么？",
    answers: [
      "微观分子间的范德华力",
      "微型吸盘产生的真空吸力",
      "脚趾分泌的有机黏液",
    ],
  },
  {
    text: "一九零一年，潜水员在希腊安提凯希拉岛附近的一艘古代沉船中打捞出一块严重锈蚀的青铜机械装置。这一制造于公元前二世纪的精密仪器拥有数十个微小齿轮，被誉为世界上最古老的天文计算机，能以惊人的精度计算日月运行周期并预测日月食。",
    question: "古希腊沉船中发现的安提凯希拉机械装置主要用于做什么？",
    answers: [
      "计算天体运行周期与预测日食月食",
      "测量海洋航行深度",
      "记录海面风向与风速",
    ],
  },
  {
    text: "第二次世界大战期间，在布莱切利园的秘密破译中心，数学家阿兰·图灵带领团队全力破解德国恩尼格玛密码机。他们研制出了庞大的机电式计算装置“炸弹机”（Bombes），通过对数百万种排列组合的自动排查，每天成功破解德军的通信密钥。",
    question: "阿兰·图灵团队研制的破译恩尼格玛密码的机电设备名称是什么？",
    answers: [
      "炸弹机（Bombes）",
      "巨人机（Colossus）",
      "恩尼格玛还原器",
    ],
  },
  {
    text: "詹姆斯·韦伯空间望远镜在距离地球约一百五十万公里的日地引力平衡点“拉格朗日L2点”运行。在网球场大小的隔热罩庇护下，其由镀金铍材质拼成的巨大六边形镜面正持续收集着宇宙大爆炸后最早诞生的原始星系所发出的微弱红外光。",
    question: "詹姆斯·韦伯空间望远镜距离地球大约有多远？",
    answers: [
      "约一百五十万公里",
      "约三十八万公里",
      "约十万公里",
    ],
  },
  {
    text: "在深达近八千米的马里亚纳海沟水下，马里亚纳狮子鱼在永恒的黑暗中自由穿梭。这种鱼全身半透明、呈果冻状，体内没有鳔，细胞内的蛋白质受到一种名为TMAO的特殊有机小分子保护，从而能够承受相当于地表大气压上千倍的恐怖水压。",
    question: "哪种化学保护分子帮助深海狮子鱼抵抗马里亚纳海沟的超强水压？",
    answers: [
      "细胞保护分子TMAO",
      "极厚的蜡质硬脂肪层",
      "富含钛金属的骨骼骨架",
    ],
  },
  {
    text: "在安第斯山脉幽深的峡谷中，印加帝国的工程大师们在完全不用木材和铁缆的情况下跨越激流建成了悬索桥。各个村落的民众采集高原特有的野生茅草，编织成结实草绳，再合拢成大树树干般粗壮的巨缆。每年全族都会举行盛大的三天庆典，将旧桥割断并织造新桥。",
    question: "印加人建造跨越峡谷的悬索桥所使用的主要天然植物材料是什么？",
    answers: [
      "编织的高原野生茅草",
      "鞣制的美洲驼皮革条",
      "用麻绳捆扎的雪松枝条",
    ],
  },
  {
    text: "一六一零年，伽利略·伽利莱将自制的手持望远镜对准木星，赫然发现了排成一线的四颗明亮光点。经过连续多夜的守望，他发现这些光点正在围绕木星公转。这些“伽利略卫星”的发现，成为了人类历史上第一个证实并非所有天体都围绕地球旋转的直接天文证据。",
    question: "伽利略在一六一零年首次观测发现了围绕木星公转的几颗卫星？",
    answers: [
      "四颗",
      "两颗",
      "七颗",
    ],
  },
  {
    text: "在中美洲的热带丛林中，古代玛雅人将可可种子奉为神圣的货币和神明的馈赠。他们不仅用可可豆进行日常贸易，还将发酵后的豆子烘焙研磨，制成苦涩浓郁的祭祀饮品。他们将可可液从高处反复倾倒以产生丰盈的泡沫，并在其中加入研磨的辣椒粉与香草。",
    question: "古代玛雅人在调制神圣的可可仪式饮品时传统上会加入什么辛辣香料？",
    answers: [
      "研磨的辣椒粉",
      "野生生姜粉",
      "干燥丁香",
    ],
  },
  {
    text: "在加勒比海与太平洋的部分热带海湾，夜幕下只要船桨划动或海浪拍打，海水便会泛起璀璨耀眼的荧光蓝。这一壮丽自然奇观是由数十亿个名为甲藻的单细胞浮游生物所激发的。当细胞膜受到水流冲击的机械刺激时，便会触发发光化学反应以惊退捕食者。",
    question: "由发光浮游生物（甲藻）受扰动所激发的生物荧光是什么颜色？",
    answers: [
      "明亮璀璨的荧光蓝",
      "深沉的翡翠绿",
      "温暖的金琥珀色",
    ],
  },
  {
    text: "变色龙改变皮肤颜色并非通过在真皮细胞内混合液态色素。在其皮肤表层下方排列着一层含有鸟嘌呤纳米晶体阵列的虹彩细胞。通过收缩或放松皮肤组织，变色龙能够精准调节这些晶体间的间距，如光子反射镜一般选择性地反射特定波长的可见光。",
    question: "变色龙主要是通过什么原理来变换体表颜色的？",
    answers: [
      "改变皮肤内部纳米晶体之间的排列间距",
      "挤压真皮鳞片下的微型色素墨囊",
      "大幅度改变身体表面的局部温度",
    ],
  },
  {
    text: "相传在埃塞俄比亚高原上，咖啡的神奇功效是由一位名叫卡尔迪的年轻牧羊人偶然发现的。他注意到羊群在啃食了一种不知名灌木丛上的鲜红浆果后，整夜欢腾跳跃、毫无倦意。充满好奇的卡尔迪摘下一把果实，送往附近的修道院探寻其中的秘密。",
    question: "根据历史传说，是谁最先敏锐察觉到了咖啡浆果的提神提劲功效？",
    answers: [
      "细心的牧羊少年卡尔迪",
      "红海的香料商人",
      "一位云游各地的僧侣",
    ],
  },
  {
    text: "在南极大陆深厚的冰盖之下，数十万年来降落的冰雪已被极度压实为致密的纯蓝冰层。在晶体结构中封存着无数来自远古史前时期的大气微小气泡。科研人员通过钻取超过三公里深度的冰芯，能够直接提取并化验分析几十万年前地球大气的真实气体样本。",
    question: "科学家在南极深层冰芯中提取并研究的是什么珍贵成分？",
    answers: [
      "封存数十万年之久的远古大气气泡",
      "古代海水的冰冻结晶残滴",
      "完整保存的灭绝树木花粉",
    ],
  },
  {
    text: "在世界各地的特定沙漠中，旅行者常会聆听到著名的“鸣沙”声学奇观。当干燥的沙粒沿着陡峭的沙丘背风坡如雪崩般滑落时，数以百万计颗粒均匀的石英沙粒以完全相同的频率相互碰撞摩擦。这种高度同步的振动汇聚成低沉悠扬的嗡鸣，宛如大提琴的琴弦在苍茫沙海中回响。",
    question: "造成沙漠中神奇“鸣沙”现象低沉轰鸣声的根本原因是什么？",
    answers: [
      "大小均匀的石英沙粒滑落时高度同步的碰撞摩擦",
      "强风吹过陡峭岩石缝隙所发出的哨音",
      "地下封闭岩溶空洞引起的空腔回音",
    ],
  },
];

import type { StoryScenario } from '../i18n';

export const stories: StoryScenario[] = [
  {
    "name": "埃莱娜",
    "item": "一个蓝色手提包",
    "itemDistractors": [
      "一个红色双肩包",
      "一个绿色行李箱"
    ],
    "place": "在公园长椅下方",
    "placeDistractors": [
      "在咖啡厅门前",
      "在列车车厢内"
    ],
    "time": "在下午15:30",
    "timeDistractors": [
      "在下午18:00",
      "在中午12:15"
    ]
  },
  {
    "name": "马可",
    "item": "一本皮革手账本",
    "itemDistractors": [
      "一本插画书",
      "一台黑色平板电脑"
    ],
    "place": "在图书馆的阅览桌上",
    "placeDistractors": [
      "在露台休息区",
      "在候车室"
    ],
    "time": "在周四上午",
    "timeDistractors": [
      "在周五下午",
      "在周二傍晚"
    ]
  },
  {
    "name": "莎拉",
    "item": "一辆黄色自行车",
    "itemDistractors": [
      "一辆银色滑板车",
      "一辆白色摩托车"
    ],
    "place": "在中央喷泉旁",
    "placeDistractors": [
      "在市政厅门前",
      "在报刊亭后面"
    ],
    "time": "在上午9:00",
    "timeDistractors": [
      "在上午11:30",
      "在下午14:00"
    ]
  },
  {
    "name": "戴维",
    "item": "一条红色羊毛围巾",
    "itemDistractors": [
      "一顶蓝色毛线帽",
      "一件棕色夹克外套"
    ],
    "place": "在咖啡店的木椅上",
    "placeDistractors": [
      "在港口的石堤上",
      "在办公楼的走廊里"
    ],
    "time": "在周六晚上",
    "timeDistractors": [
      "在周日上午",
      "在周三下午16:00"
    ]
  },
  {
    "name": "茱莉亚",
    "item": "一个白陶瓷花瓶",
    "itemDistractors": [
      "一盏金色台灯",
      "一幅木框油画"
    ],
    "place": "在厨房的窗台上",
    "placeDistractors": [
      "在玄关的柜台上",
      "在客厅的书架上"
    ],
    "time": "在傍晚17:45",
    "timeDistractors": [
      "在晚上20:00",
      "在上午10:15"
    ]
  },
  {
    "name": "卢卡斯",
    "item": "一副水手望远镜",
    "itemDistractors": [
      "一个黄铜指南针",
      "一张古老航海图"
    ],
    "place": "在灯塔的岩石上",
    "placeDistractors": [
      "在船头甲板上",
      "在码头的小木屋里"
    ],
    "time": "在黎明破晓时分",
    "timeDistractors": [
      "在夕阳日落时",
      "在正午十二点整"
    ]
  },
  {
    "name": "克莱尔",
    "item": "一台复古胶片相机",
    "itemDistractors": [
      "一个镜头收纳盒",
      "一个铝制三脚架"
    ],
    "place": "在全景景观露台上",
    "placeDistractors": [
      "在椴树林荫道旁",
      "在步行天桥上"
    ],
    "time": "在周五日落时分",
    "timeDistractors": [
      "在周六清晨",
      "在周四下午"
    ]
  },
  {
    "name": "马修",
    "item": "一块金色怀表",
    "itemDistractors": [
      "一条银质手链",
      "一枚古董戒指"
    ],
    "place": "在古董商人的书桌上",
    "placeDistractors": [
      "在酒店的保险箱里",
      "在中央玻璃展柜内"
    ],
    "time": "在周一上午11:00",
    "timeDistractors": [
      "在周三下午15:30",
      "在周五上午9:15"
    ]
  },
  {
    "name": "瓦伦蒂娜",
    "item": "一把黄色波点雨伞",
    "itemDistractors": [
      "一件绿色雨衣",
      "一条真丝披肩"
    ],
    "place": "在有轨电车站台",
    "placeDistractors": [
      "在地跌进站口",
      "在广场的骑楼长廊下"
    ],
    "time": "在周三雨中",
    "timeDistractors": [
      "在周二下班时",
      "在周四晚间"
    ]
  },
  {
    "name": "西蒙",
    "item": "一个彩色印花铁盒",
    "itemDistractors": [
      "一个精致木盒",
      "一个透明玻璃罐"
    ],
    "place": "在剧院的石阶上",
    "placeDistractors": [
      "在电影院的通道内",
      "在售票处旁边"
    ],
    "time": "在周日下午14:30",
    "timeDistractors": [
      "在周六晚上21:00",
      "在周一傍晚18:00"
    ]
  },
  {
    "name": "菲奥娜",
    "item": "一卷星空星象图",
    "itemDistractors": [
      "一个桌面地球仪",
      "一个青铜星盘"
    ],
    "place": "在山顶的天文台",
    "placeDistractors": [
      "在城堡的角楼里",
      "在天文馆前坪草地上"
    ],
    "time": "在晴朗的午夜时分",
    "timeDistractors": [
      "在晚上十点",
      "在凌晨两点"
    ]
  },
  {
    "name": "安德鲁",
    "item": "一把雕花铁钥匙",
    "itemDistractors": [
      "一把沉重的大挂锁",
      "一枚刻花纪念吊坠"
    ],
    "place": "在阁楼的大樟木箱里",
    "placeDistractors": [
      "在客厅挂画后面",
      "在书桌抽屉深处"
    ],
    "time": "在周二下午16:15",
    "timeDistractors": [
      "在周四上午10:30",
      "在周日下午"
    ]
  },
  {
    "name": "西尔维娅",
    "item": "一把珐琅铸铁茶壶",
    "itemDistractors": [
      "一个水晶玻璃水壶",
      "一只细瓷茶杯"
    ],
    "place": "在温室花房的桌上",
    "placeDistractors": [
      "在花园凉亭里",
      "在工作室的操作台上"
    ],
    "time": "在周六上午10:00",
    "timeDistractors": [
      "在周日下午17:00",
      "在周五早餐时"
    ]
  },
  {
    "name": "劳伦斯",
    "item": "一支胡桃木长笛",
    "itemDistractors": [
      "一把古董曼陀铃",
      "一根乌木琴弓"
    ],
    "place": "在石拱桥正中央",
    "placeDistractors": [
      "在小溪流水边",
      "在古老橡树的树荫下"
    ],
    "time": "在周三清晨一早",
    "timeDistractors": [
      "在周四黄昏暮色时",
      "在周六下午"
    ]
  },
  {
    "name": "爱丽丝",
    "item": "一盒彩色蜡笔",
    "itemDistractors": [
      "一本写生素描本",
      "一块油画调色板"
    ],
    "place": "在博物馆的宽阔台阶上",
    "placeDistractors": [
      "在中世纪回廊里",
      "在艺术画廊的大门前"
    ],
    "time": "在周日下午16:45",
    "timeDistractors": [
      "在周六正午",
      "在周二下午14:00"
    ]
  },
  {
    "name": "费边",
    "item": "一顶编织草帽",
    "itemDistractors": [
      "一副深色太阳镜",
      "一条格子方巾"
    ],
    "place": "在渔民的小码头上",
    "placeDistractors": [
      "在海贝沙滩边",
      "在帆船停靠锚地"
    ],
    "time": "在周五中午",
    "timeDistractors": [
      "在周日上午11:00",
      "在周三下午15:00"
    ]
  },
  {
    "name": "碧翠丝",
    "item": "一盏光亮的黄铜马灯",
    "itemDistractors": [
      "一个三叉烛台",
      "一只口袋手电筒"
    ],
    "place": "在古宅中庭的门廊下",
    "placeDistractors": [
      "在壁画长廊里",
      "在宏伟的大门前"
    ],
    "time": "在周四晚上20:30",
    "timeDistractors": [
      "在周五薄暮时分",
      "在周六深夜"
    ]
  },
  {
    "name": "罗伯特",
    "item": "一台便携式电池收音机",
    "itemDistractors": [
      "一台小型黑胶唱机",
      "一个小巧蓝牙音箱"
    ],
    "place": "在木工坊的工匠台桌上",
    "placeDistractors": [
      "在花园工具房里",
      "在机械维修站内"
    ],
    "time": "在周一清晨8:30",
    "timeDistractors": [
      "在周三下午13:00",
      "在周五傍晚17:15"
    ]
  },
  {
    "name": "卡米拉",
    "item": "一把真丝刺绣折扇",
    "itemDistractors": [
      "一条黑色蕾丝披巾",
      "一顶天鹅绒小帽"
    ],
    "place": "在城堡的观景敞廊里",
    "placeDistractors": [
      "在塔楼阳台上",
      "在镜厅中央"
    ],
    "time": "在周二日落时分",
    "timeDistractors": [
      "在周四下午",
      "在周日薄暮时"
    ]
  },
  {
    "name": "加百列",
    "item": "一本泛黄的航海日志",
    "itemDistractors": [
      "一本精装航海图集",
      "一份火漆封印羊皮纸"
    ],
    "place": "在古老榨汁坊的地窖里",
    "placeDistractors": [
      "在帆船的底层货舱",
      "在马车棚库房里"
    ],
    "time": "在周六下午15:00",
    "timeDistractors": [
      "在周一上午11:30",
      "在周三晚间"
    ]
  },
  {
    "name": "玛蒂娜",
    "item": "一盒手工黑巧克力",
    "itemDistractors": [
      "一篮香料烘焙饼干",
      "一个香浓杏仁蛋糕"
    ],
    "place": "在糕点店的展示橱窗里",
    "placeDistractors": [
      "在茶室的圆桌上",
      "在杂货店的入口处"
    ],
    "time": "在周四傍晚17:00",
    "timeDistractors": [
      "在周六上午10:30",
      "在周日下午16:15"
    ]
  },
  {
    "name": "乔治",
    "item": "一个圆形手持放大镜",
    "itemDistractors": [
      "一台便携显微镜",
      "一把高精度镊子"
    ],
    "place": "在书房的工作台案上",
    "placeDistractors": [
      "在家族历史档案馆里",
      "在工程制图桌上"
    ],
    "time": "在周三晚上19:30",
    "timeDistractors": [
      "在周二中午",
      "在周五傍晚18:45"
    ]
  },
  {
    "name": "塞蕾娜",
    "item": "一个环保帆布托特包",
    "itemDistractors": [
      "一个浅色柳条编织篮",
      "一个专业登山双肩包"
    ],
    "place": "在旧书摊的书架前",
    "placeDistractors": [
      "在鲜花集市街口",
      "在有机食品店门前"
    ],
    "time": "在周日上午10:15",
    "timeDistractors": [
      "在周六下午16:00",
      "在周四上午11:45"
    ]
  },
  {
    "name": "彼得",
    "item": "一个硬壳大提琴琴盒",
    "itemDistractors": [
      "一个乐谱收纳手提包",
      "一个古典吉他软包"
    ],
    "place": "在玻璃温室花园的舞台上",
    "placeDistractors": [
      "在大礼堂的休息厅前",
      "在音乐厅的主入口处"
    ],
    "time": "在周五晚上21:15",
    "timeDistractors": [
      "在周六下午",
      "在周日傍晚18:30"
    ]
  }
];

const nicknames = {
  adjectives: [
    '敏捷', '闪亮', '沉静', '勇敢', '聪明', '温柔', '快乐', '大胆',
    '安静', '幸运', '阳光', '睿智', '坚定', '好奇', '开朗', '灵巧',
    '耐心', '敏锐', '和善', '活泼', '自豪', '欢乐', '迅捷', '高贵',
    '机敏', '不倦', '风趣', '无畏', '金色', '银色', '蓝色', '绿色',
  ],
  animals: [
    '水獭', '狐狸', '猫头鹰', '海豚', '熊猫', '老虎', '雄鹰', '考拉',
    '猞猁', '白鹭', '獾', '猎鹰', '海龟', '鲸鱼', '兔子', '松鼠',
    '刺猬', '企鹅', '斑马', '长颈鹿', '河狸', '天鹅', '狼', '小鹿',
    '知更鸟', '海豹', '大象', '狮子', '熊', '仙鹤', '壁虎', '鹦鹉',
  ],
};

export default { ui, words, passages, stories, nicknames };
