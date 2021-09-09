## Using Base Entity

```js
class Test extends BaseEntity {
  initialize(sourceObject) {
    this.birthMonth = 'Jan';
    this.info = new Test2({ name: 'Prashant' });
  }

  validate() {
    return this.birthMonth != null && this.info.validate();
  }
}

const obj = new Test();
console.log(obj.toString());
console.log(obj.validate());
```
