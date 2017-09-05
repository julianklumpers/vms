import React, { Component } from 'react'
import styles from 'components/CrawlingBugsBackground/styles.css'
import Sketch from 'sketch-js'

class CrawlingBugsBackground extends Component {

  start(bugs, foodRate) {
    var Bug, Food

    Bug = (function() {
      function Bug(x, y) {
        this.rotate = 0
        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0
        this.radius = 1
        this.spurt = 0.5
        this.color = '#fff'
        this.hasTarget = false
        this
      }

      Bug.prototype.update = function(ctx, index, ndt) {
        var closestTarget, dist, dx, dy, food, i, lowestDist, target
        this.hasTarget = false
        if (ctx.food.length) {
          lowestDist = 999999
          closestTarget = null
          i = ctx.food.length
          while (i--) {
            food = ctx.food[i]
            dx = this.x - food.x
            dy = this.y - food.y
            dist = window.sqrt(dx * dx + dy * dy)
            if (dist < lowestDist) {
              lowestDist = dist
              closestTarget = i
            }
          }

          target = ctx.food[closestTarget]
          dx = this.x - target.x
          dy = this.y - target.y
          dist = window.sqrt(dx * dx + dy * dy)
          if (dist < target.threshold + target.radius && target.active) {
            this.hasTarget = true
            if (dist < target.radius * (target.life / target.radius) + 5) {
              target.life -= 0.07
            }
          }
        }
        if (this.hasTarget) {
          this.vx += (window.random(-0.2, 0.2)) * this.spurt
          this.vy += (window.random(-0.2, 0.2)) * this.spurt
          this.vx -= dx / 500
          this.vy -= dy / 500
        } else {
          this.vx += (window.random(-0.2, 0.5)) * this.spurt
          this.vy += (window.random(-0.2, 0.2)) * this.spurt
        }

        this.x += this.vx * ndt
        this.y += this.vy * ndt
        this.vx *= 0.95
        this.vy *= 0.95

        if (this.spurt > 0.5) {
          this.spurt -= 0.1
        }
        if (this.spurt <= 0.5 && !window.floor(window.random(1000))) {
          return this.spurt = window.random(1, 4)
        }
      }

      Bug.prototype.wrap = function(ctx) {
        if (!this.hasTarget) {
          if (this.x > ctx.width + this.radius) {
            this.x = -this.radius
          } else if (this.x < -this.radius) {
            this.x = ctx.width + this.radius
          }
          if (this.y > ctx.height + this.radius) {
            return this.y = -this.radius
          } else if (this.y < -this.radius) {
            return this.y = ctx.height + this.radius
          }
        }
      }

      return Bug

    })()

    Food = (function() {
      function Food(x, y) {
        this.x = x
        this.y = y
        this.growthRadius = 0.0001
        this.radius = window.random(20, 50)
        this.life = this.radius
        this.threshold = 50
        this.active = false
        this
      }

      Food.prototype.update = function(ctx, index, ndt) {
        if (!this.active) {
          this.growthRadius += 1
          if (this.growthRadius >= this.radius) {
            this.active = true
          }
        }
        if (this.life <= 0) {
          return ctx.food.splice(index, 1)
        }
      }

      return Food
    })()

    Sketch.create({
      container: document.getElementById(styles.bugs),
      setup: function() {
        var i
        this.tick = 0
        this.mouse.x = this.width / 2
        this.mouse.y = this.height / 2

        this.food = (function() {
          var j, results
          results = []
          for (i = j = 0; j <= 0; i = ++j) {
            results.push(new Food(window.random(this.width), window.random(this.height)))
          }

          return results
        }).call(this)

        return this.bugs = (function() {
          var j, results
          results = []
          for (i = j = 0; j <= bugs; i = ++j) {
            results.push(new Bug(0, window.random(this.height)))
          }

          return results
        }).call(this)
      },
      mousedown: function() {
        return this.food.push(new Food(this.mouse.x, this.mouse.y))
      },
      update: function() {
        var i, results
        this.ndt = window.max(0.001, this.dt / (800 / 60))
        this.tick++

        if (this.tick % foodRate === 0) {
          this.food.push(new Food(window.random(this.width), window.random(this.height)))
        }

        i = this.food.length

        while (i--) {
          this.food[i].update(this, i, this.ndt)
        }

        i = this.bugs.length
        results = []

        while (i--) {
          this.bugs[i].wrap(this)
          results.push(this.bugs[i].update(this, i, this.ndt))
        }
        return results
      },
      draw: function() {
        var bugImg = new Image(420, 287)
        bugImg.src = 'https://image.ibb.co/ew0fwa/bug.png'

        var foodImg = new Image(414, 499)
        foodImg.src = 'https://image.ibb.co/bt2cuv/food.png'

        var bug, food, i

        i = this.food.length
        while (i--) {
          this.beginPath()
          food = this.food[i]
          if (food.active) {
            this.save()
            this.drawImage(foodImg, food.x - 12.5, food.y - 19.5, 25, 39)
            this.restore()
          }
        }

        this.beginPath()
        i = this.bugs.length
        while (i--) {
          bug = this.bugs[i]
          this.save()
          this.drawImage(bugImg, bug.x - 25, bug.y - 17, 50, 34)
          this.restore()
        }

        this.beginPath()
        this.arc(this.mouse.x, this.mouse.y, 10 - window.cos(this.millis / 100) * 2, 0, window.TWO_PI)
        this.strokeStyle = '#fff'
        return this.stroke()
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.start(nextProps.bugs, nextProps.foodRate)
  }

  componentDidMount() {
    this.start(this.props.bugs, this.props.foodRate)
  }

  render() {
    return (
      <div id={styles.bugs}>
        {this.props.children}
      </div>
    )
  }
}

export default CrawlingBugsBackground
