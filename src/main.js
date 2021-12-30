import { transform3d, multiplyMatrix, getPerspectiveDistance } from "./utils/math"
import { spawnObject, transformObject} from "./utils/render"

import { Style } from "./consts"

import { MagicCube } from "./MagicCube"

const rootElement = document.querySelector(`.${Style.Root}`)
const screenHeight = rootElement.offsetHeight
rootElement.style.perspective = `${getPerspectiveDistance(45, screenHeight)}px`

const magicCube1 = spawnObject(new MagicCube())
const magicCube2 = spawnObject(new MagicCube())
const magicCube3 = spawnObject(new MagicCube())

const cube1Pos = multiplyMatrix(
    transform3d.translate([300, 0, 0]),
    transform3d.rotate(45, [1, 1, 0]),
)

const cube2Pos = multiplyMatrix(
    transform3d.translate([-300, 0, 0]),
    transform3d.rotate(45, [1, 0, 1]),
)

const cube3Pos = multiplyMatrix(
    transform3d.translate([0, 400, 0]),
    transform3d.rotate(45, [0, 1, 1]),
)

const radius = 1000

const cb = () => {
    const camX = Math.sin(Date.now() / 1000) * radius;
    const camZ = Math.cos(Date.now() / 1000) * radius;

    const view =  transform3d.lookAt([camX, 0, camZ], [0, 0, 0], [0, 1, 0])

    transformObject(magicCube1, multiplyMatrix(view, cube1Pos))
    transformObject(magicCube2, multiplyMatrix(view, cube2Pos))
    transformObject(magicCube3, multiplyMatrix(view, cube3Pos))

    requestAnimationFrame(cb)
}

requestAnimationFrame(cb)
