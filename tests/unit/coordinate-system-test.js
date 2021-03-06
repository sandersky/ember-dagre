import {expect} from 'chai'
import coordinateSystem from 'ciena-dagre/coordinate-system'
import {Graph} from 'ciena-graphlib'
import {beforeEach, describe, it} from 'mocha'

describe('coordinateSystem', function () {
  let g

  beforeEach(function () {
    g = new Graph()
  })

  describe('coordinateSystem.adjust', function () {
    beforeEach(function () {
      g.setNode('a', {width: 100, height: 200})
    })

    it('should do nothing to node dimensions with rankdir = TB', function () {
      g.setGraph({rankdir: 'TB'})
      coordinateSystem.adjust(g)
      expect(g.node('a')).eqls({width: 100, height: 200})
    })

    it('should do nothing to node dimensions with rankdir = BT', function () {
      g.setGraph({rankdir: 'BT'})
      coordinateSystem.adjust(g)
      expect(g.node('a')).eqls({width: 100, height: 200})
    })

    it('should swap width and height for nodes with rankdir = LR', function () {
      g.setGraph({rankdir: 'LR'})
      coordinateSystem.adjust(g)
      expect(g.node('a')).eqls({width: 200, height: 100})
    })

    it('should swap width and height for nodes with rankdir = RL', function () {
      g.setGraph({rankdir: 'RL'})
      coordinateSystem.adjust(g)
      expect(g.node('a')).eqls({width: 200, height: 100})
    })
  })

  describe('coordinateSystem.undo', function () {
    beforeEach(function () {
      g.setNode('a', {width: 100, height: 200, x: 20, y: 40})
    })

    it('should do nothing to points with rankdir = TB', function () {
      g.setGraph({rankdir: 'TB'})
      coordinateSystem.undo(g)
      expect(g.node('a')).eqls({x: 20, y: 40, width: 100, height: 200})
    })

    it('should flip the y coordinate for points with rankdir = BT', function () {
      g.setGraph({rankdir: 'BT'})
      coordinateSystem.undo(g)
      expect(g.node('a')).eqls({x: 20, y: -40, width: 100, height: 200})
    })

    it('should swap dimensions and coordinates for points with rankdir = LR', function () {
      g.setGraph({rankdir: 'LR'})
      coordinateSystem.undo(g)
      expect(g.node('a')).eqls({x: 40, y: 20, width: 200, height: 100})
    })

    it('should swap dims and coords and flips x for points with rankdir = RL', function () {
      g.setGraph({rankdir: 'RL'})
      coordinateSystem.undo(g)
      expect(g.node('a')).eqls({x: -40, y: 20, width: 200, height: 100})
    })
  })
})
