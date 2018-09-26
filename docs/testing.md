# Cypress e2e testing

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