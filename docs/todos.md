* packages `db` cannot use absolute imports when importing it from `app` package. Reason is app will try to look for absolute imports in db taken as root the app folder insted the db folder


# Snapshot testing

Should we use snapshot testing? 

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


