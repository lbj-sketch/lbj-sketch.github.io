/* =====================================================================
 * ★ 个人信息配置文件 —— 你只需要修改这个文件 ★
 * 所有页面内容都从这里读取。改完保存、刷新浏览器即可生效，
 * 不需要改动 index.html / style.css / app.js。
 * 说明：不需要的字段直接留空字符串 ""，对应板块会自动隐藏。
 * ===================================================================== */

var SITE = {
  /* ---------- 基础信息 ---------- */
  name: "黄璟昱",                        // ← 姓名
  title: "大模型工程师 · LLM Engineer",   // ← 职位 / 头衔
  tagline: "专注大模型训练与微调（RLHF / LoRA）、多模态模型与 AI 安全评测。",  // ← 一句话简介
  location: "中国 · 雄安",                // ← 所在地，留空则不显示
  avatarText: "黄",                      // ← 头像圆环里显示的字（通常取姓氏）
  avatarUrl: "",                         // ← 头像图片地址（可选，如 "images/me.jpg"）

  /* ---------- 关于我（支持多段） ---------- */
  about: [
    "加州大学圣地亚哥分校计算机工程硕士，香港中文大学（深圳）计算机科学与技术一等荣誉学士。现任方寸跃迁 / 雄安人工智能研究院大模型工程师，从事大模型安全对齐与自动化评测平台研发。",
    "热衷于把前沿研究做成能真正跑起来的系统：从基于 DeepSpeed 的分布式 RLHF 训练框架、7 小时训练完成的轻量级多模态 VLM，到自动化项目验证 Agent 与 RAG 系统。业余时间在 GitHub 上持续记录项目与实践。",
  ],

  /* ---------- 技能（level 为 0~100，控制进度条长度） ---------- */
  skills: [
    { name: "Python / PyTorch", level: 95 },
    { name: "LLM 训练与微调（RLHF · GRPO/GSPO · LoRA）", level: 90 },
    { name: "AI Agent / RAG（ReAct · MCP · LangChain）", level: 85 },
    { name: "分布式训练（DeepSpeed · ZeRO）", level: 85 },
    { name: "后端开发（FastAPI · 异步 · 多模型调度）", level: 85 },
    { name: "多模态模型（VLM / VQA）", level: 80 },
    { name: "C++ / CUDA", level: 75 },
    { name: "Docker / K8s / Linux / 云平台", level: 80 },
    { name: "英语（可工作语言）", level: 85 },
  ],

  /* ---------- 经历时间线（按时间倒序排列效果最佳） ---------- */
  experience: [
    {
      period: "2026.07 — 至今",
      org: "方寸跃迁 / 雄安人工智能研究院",
      role: "大模型工程师 · 雄安",
      desc: "基于 Malicious Finetuning 技术微调 Qwen3.6、Gemma4、GLM5.2 系列模型，实现安全对齐突破；参与开发方寸 AI 模型安全测评平台，实现多种自动化安全类 / 能力类 benchmark 在线测评。",
    },
    {
      period: "2026.01 — 2026.03",
      org: "TechX",
      role: "LLM 开发实习生 · 美国",
      desc: "基于 ReAct 架构与 MCP 理念构建全自动项目验证 Agent，编排多步决策循环与 10+ 维度量化报告生成；集成 ChromaDB 搭建 RAG 与长效记忆系统，精准召回 1,000+ 案例，降低幻觉率 30%；利用 Function Calling 实现插件化工具链，将人工调研时间降低 80%；基于 FastAPI 搭建高性能异步后端，无缝兼容 OpenAI 与 Claude 多模型调度，平均响应延迟 <2s。",
    },
    {
      period: "2024.09 — 2026.03",
      org: "加州大学圣地亚哥分校（UCSD）",
      role: "硕士 · 计算机工程（USNews 全球排名 23）",
      desc: "",
    },
    {
      period: "2023.05 — 2024.01",
      org: "香港中文大学（深圳）理工学院",
      role: "研究助理 · 深圳",
      desc: "搭建基于 autoencoder 结合 KMeans、随机森林、SVM、XGBoost 的深度非监督模型，用户用电窃取检测预测准确率达 90%；基于 CNN / LSTM / MLP / FreDF 的 encoder-decoder 端到端模型预测电力日前与实时价格价差，辅助用电决策，RMSE 达 1.236。",
    },
    {
      period: "2020.09 — 2024.07",
      org: "香港中文大学（深圳）",
      role: "本科 · 计算机科学与技术（一等荣誉学位）",
      desc: "",
    },
  ],

  /* ---------- 项目展示（link 留空则不显示链接按钮） ---------- */
  projects: [
    {
      name: "分布式 LLM 强化学习（RLHF）训练框架",
      desc: "基于 Qwen2.5-1.5B 与 GSM8K 构建 DeepSpeed 分布式 RLHF 全流程；复现 GRPO 并独立推导实现 GSPO（序列级重要性采样），解决奖励信号与采样颗粒度不对齐的训练不稳定问题；引入 Gradient Checkpointing 将峰值显存从 17GB 降至 5GB；GSPO 将收敛步数从 120 缩减至 50，Format Acc 99%、Answer Acc 60%。",
      tags: ["Qwen2.5-1.5B", "DeepSpeed", "GRPO / GSPO", "LoRA"],
      link: "",
    },
    {
      name: "轻量级多模态 VLM 视觉问答系统",
      desc: "基于 Qwen2.5-0.5B 与 SigLIP 构建端到端 VLM，双层 MLP Projector 实现视觉-语言模态对齐；LLaVA-CC3M(595K) 预训练 + Minimind SFT 全程仅 7 小时；设计 Mask 式 Token-level Cross-Entropy Loss 屏蔽 Image/Padding Token 梯度干扰；实现英文预训练→中文微调的跨语言迁移，在 2×32G 低资源环境下完成高质量中文图文问答与逻辑推理。",
      tags: ["Qwen2.5-0.5B", "SigLIP", "LLaVA-CC3M", "VQA"],
      link: "",
    },
    {
      name: "BERT 场景文本分类模型微调",
      desc: "基于 Transformer-BERT 对电商消息文本进行 60 类场景识别；采用 LoRA 参数高效微调，仅更新 0.13%–0.54% 参数，在降低显存占用的同时加速训练并提升准确率；引入 Warm-up + Cosine 学习率调度与 Stochastic Weight Averaging 策略，提高收敛稳定性与泛化能力。",
      tags: ["BERT", "LoRA", "NLP", "文本分类"],
      link: "",
    },
  ],

  /* ---------- 联系方式（留空的项不显示） ---------- */
  contact: {
    email: "hjy13311016@163.com",              // ← 邮箱
    wechat: "",                                // ← 微信号
    github: "https://github.com/lbj-sketch",   // ← GitHub 主页
    blog: "",                                  // ← 博客 / 其他主页链接
  },

  /* ---------- 页脚 ---------- */
  footer: "© 2026 黄璟昱 · 保留所有权利",   // ← 页脚文字
};
