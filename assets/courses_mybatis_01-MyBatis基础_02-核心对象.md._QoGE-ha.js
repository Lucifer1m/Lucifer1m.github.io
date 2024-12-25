import{_ as p}from"./chunks/ArticleMetadata.EniEqKqn.js";import{_ as h,D as k,o as n,c as r,I as o,w as d,k as t,a as y,R as g,b as c,e as A}from"./chunks/framework.FVQzxbLi.js";import"./chunks/md5.RtphNWHi.js";const D="/assets/202012252243280.KeCx0TR7.png",M=JSON.parse('{"title":"核心对象","description":"","frontmatter":{"title":"核心对象","author":"查尔斯","date":"2020/12/25 20:02","categories":["MyBatis快速入门"],"tags":["MyBatis","ORM框架"]},"headers":[],"relativePath":"courses/mybatis/01-MyBatis基础/02-核心对象.md","filePath":"courses/mybatis/01-MyBatis基础/02-核心对象.md","lastUpdated":null}'),S={name:"courses/mybatis/01-MyBatis基础/02-核心对象.md"},C=t("h1",{id:"核心对象",tabindex:"-1"},[y("核心对象 "),t("a",{class:"header-anchor",href:"#核心对象","aria-label":'Permalink to "核心对象"'},"​")],-1),B=g('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p><strong>C：</strong> 在上一篇，笔者带大家对 MyBatis 做了一个快速入门，不知道你是否已经掌握了 MyBatis 的使用步骤呢？本篇，笔者将继续带你学习 MyBatis，掌握对上篇中三个核心对象的概念理解和使用。</p><p>在 API 使用层面，MyBatis 的核心类型有三个，分别是：SqlSessionFactoryBuilder、SqlSessionFactory、SqlSession。</p><p><img src="'+D+`" alt="202012252243280"></p><h2 id="sqlsessionfactorybuilder" tabindex="-1">SqlSessionFactoryBuilder <a class="header-anchor" href="#sqlsessionfactorybuilder" aria-label="Permalink to &quot;SqlSessionFactoryBuilder&quot;">​</a></h2><p>SqlSessionFactoryBuilder 是 MyBatis 中应用构建者模式的一个类，它的作用就是用来 <strong>读取 MyBatis 的核心配置文件信息，然后来构建一个 SqlSessionFactory 对象</strong> 。</p><p>对于 SqlSessionFactoryBuilder 这个类，使用完就没有什么价值了，所以它的生命周期只存在于方法体内即可，也就是作为一个局部变量存在。</p><p><strong>以下是它的使用方式：</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// Resources 类是 MyBatis 中的一个资源加载工具类</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// 1.从 classpath 下将 MyBatis 核心配置文件内容加载为一个输入流对象</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">InputStream</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> is</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Resources.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getResourceAsStream</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;mybatis-config.xml&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">); 　　</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// 2.构建 SqlSessionFactory 对象</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">SqlSessionFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> sqlSessionFactory</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> SqlSessionFactoryBuilder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">build</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(is);</span></span></code></pre></div><p><strong>以下是它的常用方法：</strong></p><ul><li>build(InputStream inputStream) : SqlSessionFactory 通过字节输入流构建</li><li>build(Reader reader) : SqlSessionFactory 通过字符输入流构建</li><li>build(Configuration config) : SqlSessionFactory 通过Configuration构建</li><li>....</li></ul><div class="tip custom-block"><p class="custom-block-title">笔者说</p><p>因为 SqlSessionFactory 对象构建需要的配置参数很多，且不能保证每个参数都是正确的或者不能一次性得到构建所需的所有参数（有些参数是初始化时需要的，如数据源配置，延迟加载配置，事务配置等，有些是框架运行过程中需要的，如SQL映射等[1]），所以不能采用简单的 new 方式来创建对象。</p></div><h2 id="sqlsessionfactory" tabindex="-1">SqlSessionFactory <a class="header-anchor" href="#sqlsessionfactory" aria-label="Permalink to &quot;SqlSessionFactory&quot;">​</a></h2><p>SqlSessionFactory 对象比较重要，它的作用是 <strong>创建 SqlSession 对象</strong> 。</p><p><strong>以下是它的常用方法：</strong></p><ul><li><p>openSession() : SqlSession 获取 SqlSession对象</p><p>该方法是我们最常用的方法，同时也是开启事务处理的（参见下方源码）</p></li><li><p>openSession(boolean autoCommit) : SqlSession 获取SqlSession对象，自行指定是否开启事务</p><p>autoCommit 参数是用来指定是否开启自动提交的</p><p>如果 autoCommit 的值为 true，代表关闭事务处理。反之，代表开启事务处理。</p></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// DefaultSqlSessionFactory 是 SqlSessionFactory的实现类</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> DefaultSqlSessionFactory</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> SqlSessionFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    public</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> SqlSession </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">openSession</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> openSessionFromDataSource</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(configuration.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getDefaultExecutorType</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(), </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    public</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> SqlSession </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">openSession</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">boolean</span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;"> autoCommit</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> openSessionFromDataSource</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(configuration.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getDefaultExecutorType</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(), </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, autoCommit);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>每一个 MyBatis 的应用程序都以一个 SqlSessionFactory 对象为核心。SqlSessionFactory 一旦被创建， <strong>它的生命周期应该与应用的生命周期相同</strong> ，所以在应用运行期间不要重复创建 SqlSessionFactory 对象。</p><p>为此，我们可以使用单例模式来改造获取 SqlSessionFactory 对象的方式。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> * MyBatis 工具类</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">@author</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> Charles7c</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> MyBatisUtils</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    // 私有化构造函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> MyBatisUtils</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    // 静态对象</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> volatile</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> SqlSessionFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> SQL_SESSION_FACTORY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">     * 获取 SqlSessionFactory 对象</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">     * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">@return</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> 单例的 SqlSessionFactory 对象</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">     * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">@throws</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> IOException</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">     */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> SqlSessionFactory </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getSqlSessionFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">throws</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> IOException {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (SQL_SESSION_FACTORY </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">            // 同步锁</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">            synchronized</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(MyBatisUtils.class) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">                // 双重检测机制</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">                if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (SQL_SESSION_FACTORY </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">                    // 从 classpath 加载核心配置文件，构建 SqlSession 工厂对象</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">                    InputStream</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> is</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Resources.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getResourceAsStream</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;mybatis-config.xml&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">                    SQL_SESSION_FACTORY </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> SqlSessionFactoryBuilder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">build</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(is);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">                }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> SQL_SESSION_FACTORY;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><h2 id="sqlsession" tabindex="-1">SqlSession <a class="header-anchor" href="#sqlsession" aria-label="Permalink to &quot;SqlSession&quot;">​</a></h2><p>SqlSession 是 MyBatis 执行持久化操作的关键对象，类似于 JDBC 中的 Connection。 <strong>SqlSession 对象包含了执行 SQL 所需的所有方法</strong> ，它的底层封装了 JDBC 连接，可以用 SqlSession 实例来直接执行被映射的 SQL 语句。</p><p><strong>以下是它的常用方法：</strong></p><ul><li>insert(String statement, Object parameter) : int 增加操作</li><li>delete(String statement, Object parameter) : int 删除操作</li><li>update(String statement, Object parameter) : int 修改操作</li><li>selectOne(String statement) : T 单个查询</li><li>selectOne(String statement, Object parameter) : T 带参数单个查询</li><li>selectList(String statement) : List&lt;E&gt; 集合查询</li><li>selectList(String statement, Object parameter) : List&lt;E&gt; 带参数集合查询</li><li>commit() : void 提交事务</li><li>rollback() : void 回滚事务</li><li>getMapper(Class&lt;T&gt; type) : T 获取Mapper接口（Mapper接口开发）</li><li>...</li></ul><p>每个线程都应该有它自己的 SqlSession 实例， SqlSession 的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域。绝对不能将 SqlSession 实例的引用放在一个类的静态域，甚至一个类的实例变量也不行。也绝不能将 SqlSession 实例的引用放在任何类型的托管作用域中，比如 Servlet 框架中的HttpSession。如果你现在正在使用一种 Web 框架，考虑将 SqlSession 放在一个和 HTTP 请求相似的作用域中。 换句话说，每次收到 HTTP 请求，就可以打开一个 SqlSession，返回一个响应后，就关闭它。[2] <strong>使用完 SqlSeesion 之后一定记得关闭，可以采用 finally 块或 try-with-resources</strong> 。在 SqlSession 里可以执行多次 SQL 语句，但一旦关闭了 SqlSession 就需要重新创建。</p><p>结合 SqlSessionFactory 的获取方式改造，下方是在 MyBatisUtils 工具类中又增加了 SqlSession 的获取方式改造。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> * 获取 SqlSession 对象（开启事务处理）</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">@return</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> SqlSession 对象</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">@throws</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> IOException</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> SqlSession </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">openSession</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() throws IOException {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> getSqlSessionFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">openSession</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h2><p>[1]哲雪君!. 第五篇 mybatis的运行原理（2）：构建者模式， SqlSessionFactoryBuilder类解析[EB/OL]. <a href="https://www.cnblogs.com/zhexuejun/p/11285206.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/zhexuejun/p/11285206.html</a>. 2019-08-14</p><p>[2]MyBatis官网. MyBatis 入门 | 作用域（Scope）和生命周期[EB/OL]. <a href="https://mybatis.org/mybatis-3/zh/getting-started.html" target="_blank" rel="noreferrer">https://mybatis.org/mybatis-3/zh/getting-started.html</a>. 2020-12-26</p><h2 id="后记" tabindex="-1">后记 <a class="header-anchor" href="#后记" aria-label="Permalink to &quot;后记&quot;">​</a></h2><p>到此为止，笔者就介绍完了在使用 MyBatis 时，所遇到的三个核心对象。同样经过上述对这些核心对象使用的改造后，我们也看一下到底它优化到了什么程度，开开眼吧。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Test</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> testSelectList</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() throws IOException {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    // 获取SqlSession对象</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    try</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (SqlSession</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> sqlSession</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> MyBatisUtils.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">openSession</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">()){</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">        // 执行SQL语句</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        List</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&gt; </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">userList</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> sqlSession.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">selectList</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;userMapper.selectList&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">        // 遍历数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        userList.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(System.out</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">::</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">println);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (Exception </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        e.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">printStackTrace</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">笔者说</p><p>对于技术的学习，笔者一贯遵循的步骤是：先用最最简单的 demo 让它跑起来，然后学学它的最最常用 API 和 配置让自己能用起来，最后熟练使用的基础上，在空闲时尝试阅读它的源码让自己能够洞彻它的运行机制，部分问题出现的原因，同时借鉴这些技术实现来提升自己的代码高度。 所以在笔者的文章中，前期基本都是小白文，仅仅穿插很少量的源码研究。当然等小白文更新多了，你们还依然喜欢，后期会不定时专门对部分技术的源码进行解析。</p></div>`,34);function F(s,u,m,E,q,b){const l=p,e=k("ClientOnly");return n(),r("div",null,[C,o(e,null,{default:d(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(n(),c(l,{key:0,article:s.$frontmatter},null,8,["article"])):A("",!0)]}),_:1}),B])}const O=h(S,[["render",F]]);export{M as __pageData,O as default};
