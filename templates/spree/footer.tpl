<footer id="main-footer">
  <div class="footer-inner">
    <section role="site-map">
      <article id="about" class="first">
        <h5>
          关于
        </h5>
        <ul>
          <li>
          <a href="http://about.spreecast.com" rel="nofollow">酷Live</a>
          </li>
          <li>
          <a href="http://about.spreecast.com/jobs" rel="nofollow">加入我们</a>
          </li>
          <li>
          <a href="http://about.spreecast.com/our-team" rel="nofollow">我们的团队</a>
          </li>
          <li>
          <a href="http://about.spreecast.com/contact" rel="nofollow">联系我们</a>
          </li>
        </ul>
      </article>

      <article id="store">
        <h5>
          商店
        </h5>
        <ul>
          <li>
            <a href="/plans" rel="nofollow">计划</a>
          </li>
          <li>
          <a href="http://store.spreecast.com/collections/spreecast-t-shirts-and-hoodies" rel="nofollow">应用商店</a>
          </li>
        </ul>
      </article>
      <article id="help">
        <h5>
          帮助
        </h5>
        <ul>
          <li>
          <a href="http://we.labake.cn/?/topic/square/hot" rel="nofollow">帮助中心</a>
          </li>
          <li>
          <a href="http://we.labake.cn/?/question/square/" rel="nofollow">提交问题</a>
          </li>
        </ul>
      </article>
      </section>
      <section role="copyright">
        <article class="copyright">
          © 2014 Coollive, Inc. All rights reserved.<span class="copyright-divider">|</span> ICP证：京ICP备10007097号-2 <span class="copyright-divider">|</span><a href="http://coollive.labake.cn/about/privacy" rel="nofollow">隐私政策</a> <span class="copyright-divider">|</span><a href="http://coollive.labake.cn/about/terms_of_service" rel="nofollow">服务条款</a>
        </article>
      </section>
      <!--
      <section role="social-footer">
        <article>
          
          <ul>
            <li class="social-footer-button">              
            </li>
            <li class="social-footer-button">              
            </li>
          </ul>
          
        </article>
      </section>
      <span data-optimizely-experiment="2">&nbsp;</span>
       -->
  </div>
</footer>


<script id="hb-modal-login-attributes" type="text/x-handlebars-template">
    {{#if opts.ppv}}
    ppv
    {{/if}}
</script>

<script id="hb-modal-login-header" type="text/x-handlebars-template">
    {{{ modal_header_with_logo opts }}}
</script>

<script id="hb-modal-login-body"  type="text/x-handlebars-template">
    <div>
        <p class="with-no-top-margin">
            {{#if opts.loginText}}
            {{ opts.loginText }}
            {{/if}}
        </p>
        <ul>
            <li>
                <button aria-hidden="true" class="auth_link qq-signup" data-site="qq" data-social-url="/users/auth/qq" data-tracking-callback="openOauthSite">
                    <i class="qq-icon"></i>
                    <b>用QQ注册</b>
                </button>
            </li>
            <li>
                <button aria-hidden="true" class="auth_link sina-signup" data-site="weibo" data-social-url="/users/auth/weibo" data-tracking-callback="openOauthSite">
                    <i class="sina-icon"></i>
                    <b>用微博注册</b>
                </button>
            </li>

        </ul>

        <hr/>

        <form accept-charset="UTF-8" action="/member/login" class="new_user" data-remote="true" id="new_user" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="fr0RNZEZjHNxVyEV5JUUWUqzENLlGzLqmVWNdUUKP/k=" /></div>
            <fieldset>
                <label class="is-visually-hidden" for="user_email">邮箱</label>
                <input class="common-input mb-5" id="user_email" name="user[email]" placeholder="邮箱" size="30" title="输入你的邮箱" type="email" />
                <div class="clear error_field" id="email_error"></div>
                <label class="is-visually-hidden" for="user_password">密码</label>
                <input class="common-input" id="user_password" name="user[password]" placeholder="密码" size="30" title="输入你的密码" type="password" />
                <div class="clear error_field" id="password_error"></div>
                <div id="top_error" class="error_field"></div>
            </fieldset>
        </form>  </div>
</script>

<script id="hb-modal-login-footer" type="text/x-handlebars-template">
    <section class="modal-action pull-left">
        <a class="block mb-5" onclick="spree.modalMgr.showNext('forgot-password', 'login');">忘记了你的密码?</a>
        <span class="mr-5">已经有一个账号?</span>
        <a onclick="spree.modalMgr.showNext('signup', 'login');">注册</a>
    </section>
    <section class="modal-action pull-right">
        <input value="Log in" type="submit" data-tracking-event="click" data-tracking-action="user_login_submit" data-tracking-category="create_account" data-tracking-intent="si" class="btn-blue" value="{{text}}"></input>
    </section>
</script>


<script id="hb-modal" type="text/x-handlebars-template">
    <div class="modal {{{ modal_attributes identifier opts}}}" id="{{identifier}}">
        <header class="modal-header">
            {{{ modal_header identifier opts }}}
        </header>

        <div class="modal-body">
            {{{ modal_body identifier opts }}}
        </div>

        <footer class="modal-footer">
            {{{ modal_footer identifier opts }}}
        </footer>
    </div>
</script>

<script id="hb-modal-signup-attributes" type="text/x-handlebars-template">
    {{#if opts.ppv}}
    ppv
    {{/if}}
</script>
<script id="hb-modal-signup-header" type="text/x-handlebars-template">
    {{{ modal_header_with_logo opts }}}
</script>

<script id="hb-modal-signup-body" type="text/x-handlebars-template">
    {{#if opts.signUpText}}
    <p class="with-no-top-margin">{{ opts.signUpText }}</p>
    {{/if}}
    <ul>
        <li>
            <button aria-hidden="true" class="auth_link qq-signup" data-site="qq" data-social-url="/users/auth/qq" data-tracking-callback="openOauthSite">
                <i class="qq-icon"></i>
                <b>用QQ注册</b>
            </button>
        </li>
        <li>
            <button aria-hidden="true" class="auth_link sina-signup" data-site="weibo" data-social-url="/users/auth/weibo" data-tracking-callback="openOauthSite">
                <i class="sina-icon"></i>
                <b>用微博注册</b>
            </button>
        </li>

        <li>
            <button onclick="spree.modalMgr.showNext('email-signup', 'signup');" id="email-signup-button" type='button' class="email-signup" aria-hidden="true">
                <i class="email-icon"></i>
                <b>用邮箱注册</b>
            </button>
        </li>
    </ul>
</script>

<script id="hb-modal-signup-footer" type="text/x-handlebars-template">
    <section class="modal-action center">
        <a onclick="spree.modalMgr.showNext('login','signup')">已经有一个帐号?</a>
    </section>
</script>