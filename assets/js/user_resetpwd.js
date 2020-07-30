
$(function() {
    // 1. 获取 layui 提供的成员
    var form = layui.form
    // 2. 自定义 form 校验规则
    form.verify({
      // 密码长度
      pwdLength: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
      // 新密码不能与旧密码相同
      samePwd: function(value) {
        if (value === $('[name=oldPwd]').val()) {
          return '新密码不能与原密码相同！'
        }
      },
      // 密码二次验证
      rePwd: function(value) {
        if (value !== $('[name=newPwd]').val()) {
          return '两次输入的密码不一致！'
        }
      }
    })
  
    // 3. 发起请求，修改密码
    $('.layui-form').on('submit', function(e) {
      e.preventDefault()
  
      var newPwd = $(this).serialize()
      // 发起请求
      $.post('/my/updatepwd', newPwd, function(res) {
        if (res.status !== 0) {
          return layer.msg('更新密码失败！')
        }
        layer.msg('更新密码成功！')
        // 更新成功之后，重置表单
        $('.layui-form')[0].reset()
      })
    })
  })