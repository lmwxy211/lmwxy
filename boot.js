(function(){
  var root=document.documentElement;
  function size(){root.style.setProperty('--app-height',window.innerHeight+'px');}
  size();window.addEventListener('resize',size);
  window.KADA_LOAD_FAILED=false;
  function showFallback(message){
    if(window.ready)return;
    window.KADA_LOAD_FAILED=true;
    document.body.classList.add('fallback-mode');
    document.getElementById('fallback').hidden=false;
    if(message)document.getElementById('fallbackText').textContent=message;
    ['explode','stage','roof','route','top','home','night','export'].forEach(function(id){document.getElementById(id).disabled=true;});
    document.getElementById('gestureHint').textContent='点选下方模式，查看模型效果图';
    document.querySelectorAll('[data-mode]').forEach(function(button){button.onclick=function(){
      document.querySelectorAll('[data-mode]').forEach(function(b){b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button?'true':'false');});
    };});
    document.querySelectorAll('[data-part]').forEach(function(button){button.disabled=true;});
  }
  window.kadaFallback=showFallback;
  document.getElementById('retry').onclick=function(){location.reload();};
  document.getElementById('closeCopy').onclick=function(){document.getElementById('copyModal').hidden=true;};
  document.getElementById('copyUrl').onclick=function(){this.select();};
  document.getElementById('shareLink').onclick=function(){
    var url=location.origin+location.pathname;
    function manual(){var modal=document.getElementById('copyModal'),input=document.getElementById('copyUrl');input.value=url;modal.hidden=false;input.focus();input.select();}
    if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(url).then(function(){document.getElementById('shareStatus').textContent='链接已复制，可粘贴到微信发给朋友。';},manual);else manual();
  };
  document.addEventListener('keydown',function(e){if(e.key==='Escape')document.getElementById('copyModal').hidden=true;});
  var canvas=document.getElementById('scene'),context;
  try{context=canvas.getContext('webgl2',{antialias:true,alpha:false,powerPreference:'default'});}catch(e){}
  if(!context){showFallback('当前浏览器无法运行三维交互。你仍可切换查看完整、开盖和分解效果图。');return;}
  window.KADA_GL=context;
  var script=document.createElement('script');script.src='app.js';script.defer=true;script.onerror=function(){showFallback('三维资源未加载成功。请检查网络后重试，也可先查看效果图。');};document.head.appendChild(script);
  window.setTimeout(function(){if(!window.ready&&!window.KADA_LOAD_FAILED)document.getElementById('loadText').textContent='正在准备三维结构，请稍候…';},8000);
  window.setTimeout(function(){if(!window.ready)showFallback('三维加载时间较长。可以重新加载，或先查看模型效果图。');},35000);
})();
