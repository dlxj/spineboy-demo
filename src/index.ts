import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';

type AnimationSpineboy =
  | 'death'
  | 'hit'
  | 'idle'
  | 'jump'
  | 'run'
  | 'shoot'
  | 'walk';

let currentAnimation: AnimationSpineboy = 'run';

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 1920,
  height: 1080,
  backgroundColor: 0x000000
});

app.view.style.width = '100%';
app.view.style.height = 'auto';

document.body.appendChild(app.view);

const charaPromise = PIXI.Assets.load('src/assets/spineboy-ess.json');

charaPromise.then((res) => {
  const spineboy = new Spine(res.spineData);
  spineboy.pivot.set(0, -spineboy.height / 2);

  spineboy.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(spineboy);

  spineboy.state.setAnimation(
    0,
    currentAnimation,
    ['idle', 'run', 'walk'].includes(currentAnimation)
  );

  spineboy.interactive = true;
  spineboy.on('pointerdown', () => {
    if (!spineboy) return;
    const animations: AnimationSpineboy[] = [
      'death',
      'hit',
      'idle',
      'jump',
      'run',
      'shoot',
      'walk'
    ];
    const nextAnimationIndex = Math.floor(Math.random() * animations.length);
    currentAnimation = animations[nextAnimationIndex];
    spineboy.state.setAnimation(
      0,
      currentAnimation,
      ['idle', 'run', 'walk'].includes(currentAnimation)
    );
  });
});
