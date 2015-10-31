<?php /* Smarty version 2.6.27, created on 2014-04-11 09:34:20
         compiled from sk_admin/warnning.tpl */ ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>管理中心 消息提示</title>
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="/app/views/styles/general.css" rel="stylesheet" type="text/css" />
<link href="/app/views/styles/main.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/public/assets/js/jquery-1.4.2.min.js"></script>
</head>
<body>

<h1>
<span class="action-span1"><a href="/sk_admin/index.php?act=main">消息中心</a> </span><span id="search_id" class="action-span1"> -  消息</span>
<div style="clear:both"></div>
</h1>
<div class="list-div">
  <div style="background:#FFF; padding: 20px 50px; margin: 2px;">
    <table align="center" width="400">
      <tr>
        <td width="50" valign="top">
          <?php if ($this->_tpl_vars['msg']['msg_type'] == 0): ?>
          <img src="/public/assets/img/information.png" width="32" height="32" border="0" alt="information" />
          <?php elseif ($this->_tpl_vars['msg']['msg_type'] == 1): ?>
          <img src="/public/assets/img/warning.png" width="32" height="32" border="0" alt="warning" />
          <?php else: ?>
          <img src="/public/assets/img/confirm.png" width="32" height="32" border="0" alt="confirm" />
          <?php endif; ?>
        </td>
        <td style="font-size: 14px; font-weight: bold"><?php echo $this->_tpl_vars['msg']['msg_detail']; ?>
</td>
      </tr>
      <tr>
        <td></td>
        <td id="redirectionMsg">
          <?php if ($this->_tpl_vars['msg']['auto_redirect']): ?>如果没选择跳转，系统将会在 <span id="spanSeconds"><?php echo $this->_tpl_vars['msg']['auto_redirect']; ?>
</span>秒之后，自动跳转到第一个链接 <?php endif; ?>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <ul style="margin:0; padding:0 10px" class="msg-link">
            <?php $_from = $this->_tpl_vars['msg']['links']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['link']):
?>
            <li><a href="<?php echo $this->_tpl_vars['link']['href']; ?>
" <?php if ($this->_tpl_vars['link']['target']): ?>target="<?php echo $this->_tpl_vars['msg']['link']['target']; ?>
"<?php endif; ?>><?php echo $this->_tpl_vars['link']['text']; ?>
</a></li>
            <?php endforeach; endif; unset($_from); ?>
          </ul>

        </td>
      </tr>
    </table>
  </div>
</div>
<?php if ($this->_tpl_vars['msg']['auto_redirect']): ?>
<script language="JavaScript">
<!--
var seconds = <?php echo $this->_tpl_vars['msg']['auto_redirect']; ?>
;
var defaultUrl = "<?php echo $this->_tpl_vars['msg']['default_url']; ?>
";

onload = function()
{
  if (defaultUrl == 'javascript:history.go(-1)' && window.history.length == 0)
  {
    document.getElementById('redirectionMsg').innerHTML = '';
    return;
  }

  window.setInterval(redirection, 1000);
}
function redirection()
{
  if (seconds <= 0)
  {
    window.clearInterval();
    return;
  }

  seconds --;
  document.getElementById('spanSeconds').innerHTML = seconds;

  if (seconds == 0)
  {
    window.clearInterval();
    location.href = defaultUrl;
  }
}
//-->
</script>
<?php endif; ?>
<div id="footer">
</div>
<script language="JavaScript">


var cell_color = "#FFF";

if (document.getElementById("listDiv")){
  document.getElementById("listDiv").onmouseover = function(e) {
    obj = Utils.srcElement(e);
    if (obj) {
      if (obj.parentNode.tagName.toLowerCase() == "tr") row = obj.parentNode;
      else if (obj.parentNode.parentNode.tagName.toLowerCase() == "tr") row = obj.parentNode.parentNode;
      else return;
      for (i = 0; i < row.cells.length; i++) {
        if (row.cells[i].tagName != "TH") {
		    cell_color = row.cells[i].style.backgroundColor;
			row.cells[i].style.backgroundColor = '#F4FAF0';
		}
      }
    }
  }

  document.getElementById("listDiv").onmouseout = function(e) {
    obj = Utils.srcElement(e);
    if (obj) {
      if (obj.parentNode.tagName.toLowerCase() == "tr") row = obj.parentNode;
      else if (obj.parentNode.parentNode.tagName.toLowerCase() == "tr") row = obj.parentNode.parentNode;
      else return;
	  
      for (i = 0; i < row.cells.length; i++) {
          if (row.cells[i].tagName != "TH") row.cells[i].style.backgroundColor = cell_color;
      }
    }
  }
  
  document.getElementById("listDiv").onclick = function(e) {
    var obj = Utils.srcElement(e);
    if (obj.tagName == "INPUT" && obj.type == "checkbox")  {
      if (!document.forms['listForm']) {
        return;
      }

      var nodes = document.forms['listForm'].elements;
      var checked = false;
      for (i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
           checked = true;
           break;
         }
      }
	  
      if(document.getElementById("btnSubmit")) {
        document.getElementById("btnSubmit").disabled = !checked;
      }

      for (i = 1; i <= 10; i++) {
        if (document.getElementById("btnSubmit" + i)) {
          document.getElementById("btnSubmit" + i).disabled = !checked;
        }
      }
    }
  }
}

//-->

</script>

</body>
</html>