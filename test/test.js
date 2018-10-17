import { isView, isViewPartial } from '../src/utils';
import { view } from '../src/view';

describe('view()', () => {
  describe('when called on a function', () => {
    it('creates a view', () => {
      const aView = view(() => ({}));
      expect(isViewPartial(aView)).to.be.true;
      expect(isView(aView())).to.be.true;
    });
  });
});
