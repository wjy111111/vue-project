<template>
  <div ref="scrollContainer" class="scroll-container">
    <div class="meteor-shower-container pointer-events-none">
      <div v-for="i in 15" :key="'meteor-' + i" class="meteor" :style="getMeteorStyle()"></div>
    </div>
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div
        class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow-delayed"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen"
      ></div>
      <div
        class="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-pink-900/10 blur-[140px] rounded-full mix-blend-screen animate-pulse-slow"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute bottom-[-20%] left-[-20%] w-[45%] h-[45%] bg-indigo-900/10 blur-[130px] rounded-full mix-blend-screen animate-pulse-slow"
        style="animation-delay: 1.5s"
      ></div>
    </div>
    <section ref="section1" class="scroll-section min-h-screen flex flex-col">
      <main
        class="relative z-10 pt-0 pb-20 lg:pt-0 lg:pb-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 flex-1"
      >
        <div class="flex-1 space-y-8 animate-fade-in-up font-bold">
          <h1
            class="text-6xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight font-sans"
          >
            让识别不仅看见<br />现在是谁，也理解<br />
            <span
              class="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:drop-shadow-[0_0_25px_rgba(0,245,255,0.5)] transition-all duration-300"
            >
              "时间之后还是谁"
            </span>
          </h1>
          <p class="text-lg text-slate-400 max-w-2xl leading-relaxed">
            融合跨年龄识别、年龄估计与年龄合成技术，面向灵长类个体长期追踪和跨年龄人脸核验，提供可登录、可交互、可云端部署的一体化智能服务。
          </p>
          <div class="flex flex-wrap items-center gap-6 pt-4">
            <button
            style="color: white !important;"  class="bg-cyan-500 text-[#040814] px-12 py-8 rounded font-bold tracking-widest flex items-center gap-2 group transition-all duration-300 border border-transparent shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(0,245,255,0.8)] hover:-translate-y-1"
            >
              开始综合检索
              <svg
                class="w-8 h-8 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
            <button
              style="color: white !important;" class="bg-indigo-900/40 text-indigo-200 px-12 py-8 rounded font-bold tracking-widest flex items-center gap-2 group transition-all duration-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:bg-indigo-800/60 hover:text-white hover:border-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:-translate-y-1"
            >
              查看技术原理
              <svg
                class="w-8 h-8 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex gap-8 pt-8">
            <div class="text-center">
              <div
                class="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"
              >
                99.9%
              </div>
              <div class="text-xs text-slate-500 mt-1">识别准确率</div>
            </div>
            <div class="text-center">
              <div
                class="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"
              >
                15+
              </div>
              <div class="text-xs text-slate-500 mt-1">年龄跨度</div>
            </div>
            <div class="text-center">
              <div
                class="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"
              >
                1000+
              </div>
              <div class="text-xs text-slate-500 mt-1">数据库样本</div>
            </div>
          </div>
        </div>
        <div class="flex-1 relative w-full max-w-150 mx-auto lg:ml-auto lg:mr-10 animate-fade-in-left">
          <div
            class="relative p-2 rounded-xl bg-[#040814]/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_10px_rgba(0,245,255,0.1),inset_0_0_20px_rgba(0,245,255,0.05)] hover:shadow-[0_0_20px_rgba(0,245,255,0.2),inset_0_0_30px_rgba(0,245,255,0.08)] transition-all duration-300"
          >
            <div class="aspect-4/3 rounded-lg overflow-hidden relative bg-slate-900">
              <img
                src="@/assets/1.png"
                alt="Mandrill Face"
                class="w-full h-full object-cover opacity-60 mix-blend-luminosity"
              />
              <div
                class="absolute inset-0 bg-linear-to-b from-transparent via-cyan-400/20 to-transparent w-full h-full animate-scan"
              ></div>
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-500/30 rounded-full flex items-center justify-center"
              >
                <div
                  class="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,245,255,1)]"
                ></div>
              </div>
              <div class="absolute inset-0 opacity-20">
                <div
                  class="w-full h-full bg-linear-to-r from-transparent via-cyan-400 to-transparent bg-size-20px_100%"
                ></div>
                <div
                  class="w-full h-full bg-linear-to-b from-transparent via-cyan-400 to-transparent bg-size-100%_20px"
                ></div>
              </div>
            </div>
            <div
              class="absolute top-[10%] -left-8 px-4 py-2 backdrop-blur-md bg-[#040814]/60 border border-cyan-500/30 rounded text-cyan-300 text-xs font-mono tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-float-delayed-1 hover:bg-[#040814]/80 transition-all duration-300"
            >
              infancy
            </div>
            <div
              class="absolute top-[30%] -right-6 px-4 py-2 backdrop-blur-md bg-[#040814]/60 border border-cyan-500/30 rounded text-cyan-300 text-xs font-mono tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-float hover:bg-[#040814]/80 transition-all duration-300"
            >
              childhood
            </div>
            <div
              class="absolute bottom-[40%] -left-10 px-4 py-2 backdrop-blur-md bg-[#040814]/60 border border-cyan-500/30 rounded text-cyan-300 text-xs font-mono tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-float-delayed-2 hover:bg-[#040814]/80 transition-all duration-300"
            >
              youth
            </div>
            <div
              class="absolute bottom-[20%] -right-8 px-4 py-2 backdrop-blur-md bg-[#040814]/60 border border-cyan-500/30 rounded text-cyan-300 text-xs font-mono tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-float-delayed-1 hover:bg-[#040814]/80 transition-all duration-300"
            >
              adulthood
            </div>
            <div
              class="absolute -bottom-6 left-[40%] px-4 py-2 backdrop-blur-md bg-[#040814]/60 border border-cyan-500/30 rounded text-cyan-300 text-xs font-mono tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-float hover:bg-[#040814]/80 transition-all duration-300"
            >
              seniority
            </div>
          </div>
        </div>
      </main>
      <div class="relative z-10 py-16 mb-12 bg-[#0a1122]/50 border-y border-cyan-900/30 bottom-10">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            class="order-2 lg:order-1 relative h-64 lg:h-96 rounded-xl overflow-hidden flex items-center justify-center group bg-[#040814]/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_10px_rgba(0,245,255,0.1),inset_0_0_20px_rgba(0,245,255,0.05)] hover:shadow-[0_0_20px_rgba(0,245,255,0.2),inset_0_0_30px_rgba(0,245,255,0.08)] transition-all duration-300"
          >
            <div
              class="absolute inset-0 flex flex-col justify-center gap-4 px-8 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
            >
              <div class="flex items-center justify-center gap-3">
                <div
                  class="w-40 h-40 bg-slate-800 rounded border border-cyan-500/50 shadow-[0_0_15px_rgba(0,245,255,0.2)] relative hover:shadow-[0_0_25px_rgba(0,245,255,0.3)] transition-all duration-300 shrink-0 overflow-hidden group"
                >
                  <img
                    src="@/assets/1-7.jpg"
                    alt="infancy"
                    class="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span
                    class="absolute bottom-1 left-1 text-[8px] text-cyan-400 font-mono bg-black/60 px-1.5 py-0.5 rounded z-10"
                    >infancy</span
                  >
                </div>
                <div
                  class="w-40 h-40 bg-slate-800 rounded border border-cyan-900/50 relative hover:border-cyan-500/50 transition-all duration-300 shrink-0 overflow-hidden group"
                >
                  <img
                    src="@/assets/1-8.jpg"
                    alt="childhood"
                    class="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span
                    class="absolute bottom-1 left-1 text-[8px] text-cyan-500 font-mono bg-black/60 px-1.5 py-0.5 rounded z-10"
                    >childhood</span
                  >
                </div>
                <div
                  class="w-40 h-40 bg-slate-800 rounded border border-cyan-900/50 relative hover:border-cyan-500/50 transition-all duration-300 shrink-0 overflow-hidden group"
                >
                  <img
                    src="@/assets/1-9.jpg"
                    alt="youth"
                    class="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span
                    class="absolute bottom-1 left-1 text-[8px] text-cyan-500 font-mono bg-black/60 px-1.5 py-0.5 rounded z-10"
                    >youth</span
                  >
                </div>
              </div>
              <div class="flex items-center justify-center gap-3">
                <div
                  class="w-40 h-40 bg-slate-800 rounded border border-cyan-900/50 relative hover:border-cyan-500/50 transition-all duration-300 shrink-0 overflow-hidden group"
                >
                  <img
                    src="@/assets/1-10.jpg"
                    alt="adulthood"
                    class="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span
                    class="absolute bottom-1 left-1 text-[8px] text-cyan-500 font-mono bg-black/60 px-1.5 py-0.5 rounded z-10"
                    >adulthood</span
                  >
                </div>
                <div
                  class="w-40 h-40 bg-slate-800 rounded border border-cyan-500/50 shadow-[0_0_15px_rgba(0,245,255,0.2)] relative hover:shadow-[0_0_25px_rgba(0,245,255,0.3)] transition-all duration-300 shrink-0 overflow-hidden group"
                >
                  <img
                    src="@/assets/1-11.jpg"
                    alt="seniority"
                    class="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span
                    class="absolute bottom-1 left-1 text-[8px] text-cyan-400 font-mono bg-black/60 px-1.5 py-0.5 rounded z-10"
                    >seniority</span
                  >
                </div>
              </div>
            </div>
            <span
              class="absolute text-cyan-500/50 font-mono text-sm tracking-widest border border-cyan-500/30 px-4 py-2 rounded bg-[#040814]/80 backdrop-blur"
            >
              [ 时间轴照片区占位 / 同一个体序列 ]
            </span>
          </div>
          <div class="order-1 lg:order-2 space-y-6">
            <h2 class="text-3xl font-bold text-white flex items-center gap-3">
              <span
                class="w-1 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,245,255,0.8)]"
              ></span>
              平台简介
            </h2>
            <p class="text-slate-400 leading-relaxed text-lg">
              本平台围绕"跨时间域生物面部识别"构建，目标是解决个体在成长、成熟与衰老过程中外观持续变化所带来的身份检索困难。系统通过<strong
                class="text-cyan-300 font-normal"
                >共享骨干网络、年龄不变身份表示学习、年龄估计与年龄合成模块</strong
              >协同工作，实现从单张图片出发的跨时间检索、年龄预测与结果解释。
            </p>
            <div class="pt-10 space-y-5">
              <p class="text-sm font-mono text-cyan-500 uppercase tracking-widest">
                适用方向 / Use Cases
              </p>
              <div class="flex flex-wrap gap-10">
                <span
                  class="px-8 py-5 bg-cyan-900/20 border border-cyan-800 text-cyan-400 text-xs rounded-full hover:bg-cyan-900/30 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300"
                  >灵长类个体长期追踪</span
                >
                <span
                  class="px-8 py-5 bg-cyan-900/20 border border-cyan-800 text-cyan-400 text-xs rounded-full hover:bg-cyan-900/30 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300"
                  >跨年龄身份核验</span
                >
                <span
                  class="px-8 py-5 bg-cyan-900/20 border border-cyan-800 text-cyan-400 text-xs rounded-full hover:bg-cyan-900/30 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300"
                  >失踪人口查找</span
                >
                <span
                  class="px-8 py-5 bg-cyan-900/20 border border-cyan-800 text-cyan-400 text-xs rounded-full hover:bg-cyan-900/30 hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300"
                  >野外监测</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      ref="section2"
      class="scroll-section relative z-10 py-32 mt-12 bg-[#0a1122]/30 border-t border-cyan-900/30"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-900/30 via-[#0a1122]/50 to-[#0a1122]/70 height-[120%] -top-1/4"
      ></div>
      <div class="max-w-7xl mx-auto px-6 relative">
        <div class="mt-24 mb-24">
          <h2 class="text-5xl md:text-6xl font-bold text-white text-center mb-10 tracking-widest">
            <span
              class="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              >核心功能</span
            >
          </h2>
          <p class="text-cyan-500/80 font-mono uppercase tracking-widest text-base text-center">
            Core Service Offerings
          </p>
          <div
            class="w-48 h-1.5 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(0,245,255,0.8)]"
          ></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div
            class="group bg-[#040814]/70 border border-cyan-900/30 rounded-3xl overflow-hidden transition-all duration-300 hover:bg-[#040814]/90 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transform hover:-translate-y-4 shadow-2xl"
          >
            <div
              class="h-80 bg-[#0a1122] rounded-t-3xl relative overflow-hidden border-b border-cyan-900/30"
            >
              <div
                class="absolute inset-0 "
              >
                <img
                  src="../assets/first.png"
                  alt="综合检索占位图"
                  class="w-full h-full object-cover ">
              </div>
              <div
                class="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              ></div>
            </div>
            <div class="p-12 relative">
              <span
                class="text-xs text-cyan-400 font-mono tracking-widest border border-cyan-400/30 px-3 py-1 rounded"
                >核心业务一</span
              >
              <h3
                class="text-3xl font-bold text-white mt-6 mb-6 group-hover:text-cyan-300 transition-colors duration-300"
              >
                综合检索
              </h3>
              <p class="text-slate-400 leading-relaxed text-base h-24">
                上传一张山魈照片，系统自动预测其当前年龄，返回数据库中五个年龄阶段最相似的真实照片，并同步展示五个年龄阶段的合成结果图像。
              </p>
              <div class="mt-8 flex justify-end">
                <button
                  class="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-[#040814] group-hover:shadow-[0_0_20px_rgba(0,245,255,0.8)] transition-all duration-300"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            class="group bg-[#040814]/70 border border-cyan-900/30 rounded-3xl overflow-hidden transition-all duration-300 hover:bg-[#040814]/90 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transform hover:-translate-y-4 shadow-2xl"
          >
            <div
              class="h-80 bg-[#0a1122] rounded-t-3xl relative overflow-hidden border-b border-cyan-900/30"
            >
              <div
                class="absolute inset-0 "
              >
                <img
                  src="../assets/second.png"
                  alt="失踪人口查找占位图"
                  class="w-full h-full object-cover ">
              </div>
              <div
                class="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              ></div>
            </div>
            <div class="p-12 relative">
              <span
                class="text-xs text-cyan-400 font-mono tracking-widest border border-cyan-400/30 px-3 py-1 rounded"
                >核心业务二</span
              >
              <h3
                class="text-3xl font-bold text-white mt-6 mb-6 group-hover:text-blue-300 transition-colors duration-300"
              >
                失踪人口查找
              </h3>
              <p class="text-slate-400 leading-relaxed text-base h-24">
                输入 30 岁以下时期照片，系统在数据库中检索该人物 30
                岁以上时期的候选结果，用于跨年龄追踪与身份辅助核验。
              </p>
              <div class="mt-8 flex justify-end">
                <button
                  class="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-[#040814] group-hover:shadow-[0_0_20px_rgba(0,245,255,0.8)] transition-all duration-300"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      ref="section3"
      class="scroll-section relative z-10 py-12 bg-[#0a1122]/30 border-t border-cyan-900/30"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-900/30 via-[#0a1122]/50 to-[#0a1122]/70"
      ></div>
      <div class="max-w-7xl mx-auto px-6 relative">
        <div class="mt-10 mb-32">
          <h2 class="text-5xl md:text-6xl font-bold text-white text-center mb-10 tracking-widest">
            <span
              class="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              >三步完成智能检索</span
            >
          </h2>
          <p class="text-cyan-500/80 font-mono uppercase tracking-widest text-base text-center">
            Three Steps to Complete Intelligent Retrieval
          </p>
          <div
            class="w-48 h-1.5 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(0,245,255,0.8)]"
          ></div>
        </div>
        <div class="relative grid grid-cols-1 md:grid-cols-3 gap-24">
          <div
            class="hidden md:block absolute top-28 left-[10%] right-[10%] h-px bg-cyan-900 border-t border-dashed border-cyan-500/30 z-0"
          ></div>
          <div
            class="relative z-10 flex flex-col items-center text-center space-y-12 group p-12 bg-[#040814]/70 rounded-3xl hover:bg-[#040814]/90 transition-all duration-300 border border-cyan-900/30 hover:border-cyan-500/50 shadow-2xl"
          >
            <div
              class="w-52 h-52 rounded-full bg-[#040814] border-4 border-cyan-500 shadow-[0_0_50px_rgba(0,245,255,0.5)] flex items-center justify-center text-6xl font-bold text-cyan-400 font-mono relative group-hover:shadow-[0_0_80px_rgba(0,245,255,0.8)] transition-all duration-300"
            >
              01
              <div
                class="absolute -right-3 top-0 w-5 h-5 bg-cyan-400 rounded-full animate-ping"
              ></div>
              <div class="absolute inset-0 rounded-full bg-cyan-500/10 animate-pulse-slow"></div>
            </div>
            <div class="space-y-6">
              <h3
                class="text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300"
              >
                上传图片
              </h3>
              <p class="text-slate-400 text-lg leading-relaxed">
                上传山魈照片或<br />青年时期人脸照片
              </p>
            </div>
          </div>
          <div
            class="relative z-10 flex flex-col items-center text-center space-y-12 group p-12 bg-[#040814]/70 rounded-3xl hover:bg-[#040814]/90 transition-all duration-300 border border-cyan-900/30 hover:border-blue-500/50 shadow-2xl"
          >
            <div
              class="w-52 h-52 rounded-full bg-[#040814] border-4 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.5)] flex items-center justify-center text-6xl font-bold text-blue-400 font-mono relative group-hover:shadow-[0_0_80px_rgba(59,130,246,0.8)] transition-all duration-300"
            >
              02
              <svg
                class="absolute inset-0 w-full h-full animate-spin-slow text-blue-500/50"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-dasharray="10 5"
                />
              </svg>
              <div
                class="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse-slow-delayed"
              ></div>
            </div>
            <div class="space-y-6">
              <h3
                class="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300"
              >
                模型分析
              </h3>
              <p class="text-slate-400 text-lg leading-relaxed">
                完成识别、年龄估计<br />检索与年龄合成
              </p>
            </div>
          </div>
          <div
            class="relative z-10 flex flex-col items-center text-center space-y-12 group p-12 bg-[#040814]/70 rounded-3xl hover:bg-[#040814]/90 transition-all duration-300 border border-cyan-900/30 hover:border-purple-500/50 shadow-2xl"
          >
            <div
              class="w-52 h-52 rounded-full border-4 border-purple-400 shadow-[0_0_60px_rgba(168,85,247,0.6)] flex items-center justify-center text-6xl font-bold text-white font-mono bg-purple-500/10 group-hover:shadow-[0_0_90px_rgba(168,85,247,0.9)] transition-all duration-300"
            >
              03
              <div class="absolute inset-0 rounded-full bg-purple-400/10 animate-pulse-slow"></div>
            </div>
            <div class="space-y-6">
              <h3
                class="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300"
              >
                查看结果
              </h3>
              <p class="text-slate-400 text-lg leading-relaxed">
                返回真实候选结果<br />和可视化合成结果
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      ref="section4"
      class="scroll-section relative z-10 py-20 bg-[#0a1122]/30 border-t border-cyan-900/30 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/30 via-[#0a1122]/50 to-[#0a1122]/70"
      ></div>
      <div class="max-w-7xl mx-auto px-6 relative">
        <div class="mb-32">
          <h2 class="text-5xl md:text-6xl font-bold text-white text-center mb-10 tracking-widest">
            <span
              class="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              >应用场景</span
            >
          </h2>
          <p class="text-cyan-500/80 font-mono uppercase tracking-widest text-base text-center">
            Application Scenarios
          </p>
          <div
            class="w-48 h-1.5 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(0,245,255,0.8)]"
          ></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div
            class="group bg-[#040814]/70 border border-cyan-900/30 rounded-3xl p-12 hover:bg-[#040814]/90 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-all duration-300 transform hover:-translate-y-4 shadow-2xl"
          >
            <div
              class="w-24 h-24 rounded-full bg-cyan-500/15 flex items-center justify-center mb-8 group-hover:bg-cyan-500/25 transition-all duration-300"
            >
              <div
                class="w-12 h-12 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.8)] group-hover:shadow-[0_0_30px_rgba(0,245,255,1)] transition-all duration-300"
              ></div>
            </div>
            <h3
              class="text-2xl font-bold text-white mb-6 group-hover:text-cyan-300 transition-colors duration-300"
            >
              灵长类个体长期追踪
            </h3>
            <p class="text-slate-400 text-base leading-relaxed">
              对灵长类个体进行长期跟踪监测，记录其成长发育过程和行为变化模式，为科学研究提供数据支撑。
            </p>
          </div>
          <div
            class="group bg-[#040814]/70 border border-cyan-900/30 rounded-3xl p-12 hover:bg-[#040814]/90 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 transform hover:-translate-y-4 shadow-2xl"
          >
            <div
              class="w-24 h-24 rounded-full bg-blue-500/15 flex items-center justify-center mb-8 group-hover:bg-blue-500/25 transition-all duration-300"
            >
              <div
                class="w-12 h-12 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] group-hover:shadow-[0_0_30px_rgba(59,130,246,1)] transition-all duration-300"
              ></div>
            </div>
            <h3
              class="text-2xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors duration-300"
            >
              野外监测与种群管理
            </h3>
            <p class="text-slate-400 text-base leading-relaxed">
              实时监测野外种群动态，为保护区管理和生物多样性保护提供科学数据支持和技术解决方案。
            </p>
          </div>
          <div
            class="group bg-[#040814]/70 border border-cyan-900/30 rounded-3xl p-12 hover:bg-[#040814]/90 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.2)] transition-all duration-300 transform hover:-translate-y-4 shadow-2xl"
          >
            <div
              class="w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center mb-8 group-hover:bg-green-500/25 transition-all duration-300"
            >
              <div
                class="w-12 h-12 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] group-hover:shadow-[0_0_30px_rgba(74,222,128,1)] transition-all duration-300"
              ></div>
            </div>
            <h3
              class="text-2xl font-bold text-white mb-6 group-hover:text-green-300 transition-colors duration-300"
            >
              跨年龄身份核验
            </h3>
            <p class="text-slate-400 text-base leading-relaxed">
              通过跨年龄识别技术，实现失踪人口查找和身份核验功能，为社会安全提供技术支持。
            </p>
          </div>
          <div
            class="min-h-70 group bg-[#040814]/70 border border-cyan-900/30 rounded-3xl p-12 hover:bg-[#040814]/90 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300 transform hover:-translate-y-4 shadow-2xl"
          >
            <div
              class="w-24 h-24 rounded-full bg-purple-500/15 flex items-center justify-center mb-8 group-hover:bg-purple-500/25 transition-all duration-300"
            >
              <div
                class="w-12 h-12 rounded-full bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:shadow-[0_0_30px_rgba(168,85,247,1)] transition-all duration-300"
              ></div>
            </div>
            <h3
              class="text-2xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors duration-300"
            >
              野生动物保护研究
            </h3>
            <p class="text-slate-400 text-base leading-relaxed">
              为野生动物保护机构和研究机构提供技术支持和数据服务，推动生物多样性保护事业发展。
            </p>
          </div>
        </div>
      </div>
    </section>
    <footer class="relative z-10 border-t border-cyan-900/50 bg-[#02040a] py-8">
      <div
        class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div
          class="text-slate-500 text-sm font-mono tracking-widest hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
        >
          <div class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          © 2024 MandrillFace. All rights reserved.
        </div>
        <div
          class="text-cyan-600/50 text-xs font-mono tracking-[0.2em] uppercase hover:text-cyan-400 transition-colors duration-300"
        >
          Cross-Time Identity Retrieval System
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted , onUnmounted} from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)
const scrollContainer = ref<HTMLElement | null>(null)
const sections = ['section1', 'section2', 'section3', 'section4']
let currentIndex = 0
let isAnimating = false
const scrollTo = (index: number) => {
  if (index < 0 || index >= sections.length) return
  isAnimating = true
  currentIndex = index
  gsap.to(scrollContainer.value, {
    scrollTo: { y: window.innerHeight * index },
    duration: 1.5,
    ease: 'power2.inOut',
    onComplete: () => {
      setTimeout(() => {
        isAnimating = false
      }, 200)
    },
  })
}
const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  if (isAnimating) return
  if (e.deltaY > 50) {
    scrollTo(currentIndex + 1)
  } else if (e.deltaY < -50) {
    scrollTo(currentIndex - 1)
  }
}
onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
})
onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
})
const getMeteorStyle = () => {
  const left = Math.floor(Math.random() * 150) - 20 + '%'
  const top = Math.floor(Math.random() * -30) - 10 + '%'
  const delay = (Math.random() * 8).toFixed(2) + 's'
  const duration = (Math.random() * 2 + 1.5).toFixed(2) + 's'
  return {
    left,
    top,
    animationDelay: delay,
    animationDuration: duration,
  }
}
</script>
<style scoped>
html, body, #app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
.animate-pulse-slow-delayed {
  animation: pulse-slow 6s ease-in-out 2s infinite;
}
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
.animate-scan {
  animation: scan 3s linear infinite;
}
.animate-spin-slow {
  animation: spin 8s linear infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
.animate-float-delayed-1 {
  animation: float 4s ease-in-out 1s infinite;
}
.animate-float-delayed-2 {
  animation: float 5s ease-in-out 2s infinite;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    filter: blur(4px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
  }
}
.animate-fade-in-up {
  animation: fadeIn 0.8s ease-out forwards;
}
@keyframes fadeInZoom {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in-left {
  animation: fadeInZoom 0.8s ease-out forwards;
}
@keyframes gridScan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
.bg-linear-to-r {
  animation: gridScan 8s linear infinite;
}
@keyframes buttonGlow {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(0, 245, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 25px rgba(0, 245, 255, 0.8);
  }
}
.group:hover .button-glow {
  animation: buttonGlow 2s ease-in-out infinite;
}
@keyframes textNeon {
  0%,
  100% {
    text-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 25px rgba(0, 245, 255, 0.5);
  }
}
.text-cyan-400 {
  animation: textNeon 3s ease-in-out infinite;
}
.scroll-container {
  height: 100vh;
  overflow-y: auto;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}
.scroll-section {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.meteor {
  position: absolute;
  width: 2px;
  height: 120px;
  background: linear-gradient(to top, rgba(0, 245, 255, 1), transparent);
  transform: rotate(45deg);
  opacity: 0;
  animation: meteorFall linear infinite;
  box-shadow: 0 0 10px 1px rgba(0, 245, 255, 0.3);
  border-radius: 50%;
}
.meteor::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 15px 3px #00f5ff;
}
@keyframes meteorFall {
  0% {
    transform: rotate(45deg) translateY(-200px);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: rotate(45deg) translateY(1800px);
    opacity: 0;
  }
}
</style>
