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