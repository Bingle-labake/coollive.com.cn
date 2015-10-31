<?php /* Smarty version 2.6.27, created on 2014-04-08 18:56:07
         compiled from sk_admin/pages.tpl */ ?>
<table cellspacing="0" cellpadding="0" width="100%"  class="listpage">
 
<tr><td><div class="xspace-page"><a href="<?php echo $this->_tpl_vars['pages']['first']; ?>
" class="">首页</a> <a href="<?php echo $this->_tpl_vars['pages']['prev']; ?>
" class="">上页</a> <a  href="<?php echo $this->_tpl_vars['pages']['next']; ?>
">下页</a> <a  href="<?php echo $this->_tpl_vars['pages']['last']; ?>
">未页</a> 页次：<strong><?php echo $this->_tpl_vars['pages']['curr_page']; ?>
</strong>/<strong><?php echo $this->_tpl_vars['pages']['last_page']; ?>
 </strong><input name="page_size" onkeypress="changePageSize(event)" size="3" type="text" value="<?php echo $this->_tpl_vars['pages']['page_size']; ?>
" />条记录/页 转
到 
<select name="PB_Page_Select" onchange="window.location='?page='+this.options[this.selectedIndex].value; if (0) this.selectedIndex=0;">
<?php unset($this->_sections['loop']);
$this->_sections['loop']['name'] = 'loop';
$this->_sections['loop']['loop'] = is_array($_loop=$this->_tpl_vars['pages']['last_page']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['loop']['show'] = true;
$this->_sections['loop']['max'] = $this->_sections['loop']['loop'];
$this->_sections['loop']['step'] = 1;
$this->_sections['loop']['start'] = $this->_sections['loop']['step'] > 0 ? 0 : $this->_sections['loop']['loop']-1;
if ($this->_sections['loop']['show']) {
    $this->_sections['loop']['total'] = $this->_sections['loop']['loop'];
    if ($this->_sections['loop']['total'] == 0)
        $this->_sections['loop']['show'] = false;
} else
    $this->_sections['loop']['total'] = 0;
if ($this->_sections['loop']['show']):

            for ($this->_sections['loop']['index'] = $this->_sections['loop']['start'], $this->_sections['loop']['iteration'] = 1;
                 $this->_sections['loop']['iteration'] <= $this->_sections['loop']['total'];
                 $this->_sections['loop']['index'] += $this->_sections['loop']['step'], $this->_sections['loop']['iteration']++):
$this->_sections['loop']['rownum'] = $this->_sections['loop']['iteration'];
$this->_sections['loop']['index_prev'] = $this->_sections['loop']['index'] - $this->_sections['loop']['step'];
$this->_sections['loop']['index_next'] = $this->_sections['loop']['index'] + $this->_sections['loop']['step'];
$this->_sections['loop']['first']      = ($this->_sections['loop']['iteration'] == 1);
$this->_sections['loop']['last']       = ($this->_sections['loop']['iteration'] == $this->_sections['loop']['total']);
?>
<option value="<?php echo $this->_sections['loop']['index']+1; ?>
"><?php echo $this->_sections['loop']['index']+1; ?>
</option>　　　
<?php endfor; endif; ?>
</select> 页 共 <strong><?php echo $this->_tpl_vars['pages']['count']; ?>
</strong> 条记录</div></td></tr></table>
<script>
changePageSize = function(e){
    var evt = Utils.fixEvent(e);
    if (evt.keyCode == 13) {		
        window.location='?page_size='+$('input[name="page_size"]').val();
        return false;
    };
}
</script>