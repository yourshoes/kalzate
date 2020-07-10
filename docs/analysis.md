
# Desktop vs Web

Desktop advantages:
  - Focus on single browser vendor (chrome)
  - Node context available (more flexibility and capabilities)

Desktop disadvantages:
  - Require signing apps
  - Require local setup

# Snapshot testing

```js
import toJSON from 'enzyme-to-json';

describe('<App/>', ()=>{

  it('matches the snapshot', () => {

      const tree = shallow(<App/>);

      expect(toJSON(tree)).toMatchSnapshots();

  });

})
```

use `jest.spyOn(lib, method).mockImplementation()` instead of `sinon.stub(lib, method).returns()` and `jest.fn()` instead of `sinon.spy()`


