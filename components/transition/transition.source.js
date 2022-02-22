const getClassNames = name => ({
    enter: `xx-transition xx-${name}-enter xx-${name}-enter-active enter-class enter-active-class`,
    'enter-to': `xx-transition xx-${name}-enter-to xx-${name}-enter-active enter-to-class enter-active-class`,
    leave: `xx-transition xx-${name}-leave xx-${name}-leave-active leave-class leave-active-class`,
    'leave-to': `xx-transition xx-${name}-leave-to xx-${name}-leave-active leave-to-class leave-active-class`
  })
  Component({
    externalClasses: [
      'custom-class',
      'enter-class',
      'enter-active-class',
      'enter-to-class',
      'leave-class',
      'leave-active-class',
      'leave-to-class'
    ],
    /**
     * 组件的属性列表
     */
    properties: {
      show: {
        type: Boolean,
        value: true,
        observer: 'observeShow'
      },
      duration: {
        type: null,
        value: 300
      },
      name: {
        type: String,
        value: 'fade'
      },
      customStyle: {
        type: String,
        value: ''
      },
      animation: {
        type: Boolean,
        value: false
      },
      animationData: {
        type: null,
        value: {}
      }
    },
    /**
     * 组件的初始数据
     */
    data: {
      isShow: false,
      currentDuration: 300
    },
    ready() {
      this.transitionEnd = true
      if (this.data.show === true) {
        this.observeShow(true)
      }
    },
    /**
     * 组件的方法列表
     */
    methods: {
      // 触发click事件
      emitClick() {
        this.triggerEvent('click')
      },
      observeShow(value) {
        if (this.data.animation) {
          this.setData({
            isShow: value
          })
          return
        }
        if (!this.transitionEnd) {
          return
        }
        value ? this.enter() : this.leave()
      },
      enter() {
        this.transitionEnd = false
        const {
          name,
          duration
        } = this.data
        const classNames = getClassNames(name)
        this.status = 'enter'
        this.triggerEvent('before-enter') // 进入前触发事件
        this.nextTick(() => {
          this.setData({
              classes: classNames.enter,
              isShow: true,
              currentDuration: duration !== null && typeof duration === 'object' ?
                duration.enter || 300 :
                duration
            },
            () => {
              this.triggerEvent('enter') // 进入中触发
              this.nextTick(() => {
                this.setData({
                  classes: classNames['enter-to']
                })
                setTimeout(() => {
                  this.onTransitionEnd()
                }, this.data.currentDuration)
              })
            }
          )
        })
      },
      leave() {
        this.transitionEnd = false
        const {
          name,
          duration
        } = this.data
        const classNames = getClassNames(name)
        this.status = 'leave'
        this.triggerEvent('before-leave') // 离开前触发
        this.nextTick(() => {
          this.setData({
              classes: classNames.leave,
              currentDuration: duration !== null && typeof duration === 'object' ?
                duration.leave || 300 :
                duration
            },
            () => {
              this.triggerEvent('leave') // 离开中触发
              this.nextTick(() => {
                this.setData({
                  classes: classNames['leave-to']
                })
                // 移除元素
                setTimeout(() => {
                  this.setData({
                    isShow: false
                  })
                  this.onTransitionEnd()
                }, this.data.currentDuration)
              })
            }
          )
        })
      },
      // 获取元素帧的时刻
      nextTick(cb) {
        return wx
          .createSelectorQuery()
          .selectViewport()
          .boundingClientRect()
          .exec(() => {
            cb()
          })
      },
      // 过渡结束后触发
      onTransitionEnd() {
        this.transitionEnd = true
        const {
          show,
          isShow
        } = this.data
        if (isShow !== show) {
          this.observeShow(show)
        } else {
          this.triggerEvent(`after-${this.status}`)
          this.setData({
            classes: ""
          })
        }
      }
    }
  })