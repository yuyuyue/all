// 混入
// Disposable
class Disposable{
  isDiposed: boolean
  dispose() {
    this.isDiposed = true
  }
}

// Activatable
class Activatable{
  isActive: boolean
  active() {
    this.isActive = true
  }
  deactive() {
    this.isActive = false
  }
}

// SmartObject 使用了接口，需要初始化两个接口的变量和定义方法
// 为将要mixin进来的属性方法创建出占位属性。 这告诉编译器这些成员在运行时是可用的。 这样就能使用mixin带来的便利，虽说需要提前定义一些占位属性。
class SmartObject implements Disposable, Activatable {
  constructor() {
    setInterval( () => console.log(this.isActive + ':' + this.isDiposed), 500)
  }
  interacrt() {
    this.active()
  }
  // 实现Disposable
  isDiposed: boolean = false
  dispose: () => void
  // 实现Active
  isActive: boolean = false
  active:() => void
  deactive: () => void
}
function apply(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name]
    })
  }) 
}

apply(SmartObject, [Disposable, Activatable])

let smartObj = new SmartObject()
setTimeout( () => smartObj.interacrt(), 1000)