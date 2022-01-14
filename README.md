**初衷：由于最近一直在做小程序，在做过渡效果时，没有找到令人满意的过渡插件，因此手撸一个。**

下载地址：[wx-transition组件](https://github.com/zhouxni/wx-transition)

<br/>

**基础用法**

将元素包裹在 transition 组件内，在元素展示/隐藏时，会有相应的过渡动画。

```
<transition show="{{ show }}">内容</transition>
```

<br/>

**动画类型**

transition 组件内置了多种动画，可以通过 name 字段指定动画类型。

```
<transition name="fade" show="{{ show }}">内容</transition>
```

|名称|说明|
|--|--|
|fade|淡入|
|fade-up|上滑淡入|
|fade-down|下滑淡入|
|fade-left|左滑淡入|
|fade-right|右滑淡入|
|slide-up|上滑进入|
|slide-down|下滑进入|
|slide-left|左滑进入|
|slide-right|右滑进入|

<br/>

**高级用法**

可以通过外部样式类自定义过渡效果，还可以定制进入和移出的持续时间。

```
<transition
  show="{{ show }}"
  name=""
  duration="{{ { enter: 300, leave: 1000 } }}"
  enter-class="enter-class"
  enter-active-class="enter-active-class"
  leave-active-class="leave-active-class"
  leave-to-class="leave-to-class"
/>
```

```
.enter-active-class,
.leave-active-class {
  transition-property: background-color, transform;
}

.enter-class,
.leave-to-class {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
```

或者可以与animation.css结合使用

```
<transition
  show="{{ show }}"
  name=""
  duration="{{1000}}"
  enter-active-class="animate__animated animate__fadeIn"
  leave-active-class="animate__animated animate__fadeOut"
/>
```

注意：duration要设置为animate.css中动画时间，另外animate.css中root选择器要改为page。

<br/>

### API

<br/>

**  props**

|参数|说明|类型|默认值|
|--|--|--|--|
|name|动画类型|string|fade|
|show|是否展示组件|boolean|true|
|duration|动画时长，单位为毫秒|number \| object|300|
|custom-style|自定义样式|string||
|animation|是否开启wx.createAnimation动画|boolean|false|
|animationData|wx.createAnimation动画数据|object|null|

<br/>

**Events**

|事件名|说明|参数|
|--|--|--|
|bind:click|点击组件时触发|-|
|bind:before-enter|进入前触发|-|
|bind:enter|进入中触发|-|
|bind:after-enter|进入后触发|-|
|bind:before-leave|离开前触发|-|
|bind:leave|离开中触发|-|
|bind:after-leave|离开后触发|-|

<br/>

**外部样式类**

|类名|说明|
|--|--|
|custom-class|根节点样式类|
|enter-class|定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。|
|enter-active-class|定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。|
|enter-to-class|定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。|
|leave-class|定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。|
|leave-active-class|定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。|
|leave-to-class|定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。|
