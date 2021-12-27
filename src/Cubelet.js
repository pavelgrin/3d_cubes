import { transform3d, multiplyMatrix, toCssMatrixView } from "./utils/math"
import { Styles } from "./consts"

const identityMatrix = transform3d.identityMatrix

const CubeFaces = Object.freeze({
    Front: {
        name: "front",
        pos: identityMatrix,
    },
    Top: {
        name: "top",
        pos: "",
    },
})

const CUBE_FACES = ["front", "top", "bottom", "left", "right", "back"]

export class Cubelet {
    constructor(colors) {
        this.colors = colors

        this.cubeElement = document.createElement("div")
        this.cubeElement.classList.add(Styles.Cubelet)

        this.createCube()
    }

    get element() {
        return this.cubeElement
    }

    createCube() {
        const faceElements = this.generateFaceElements()

        faceElements.forEach((element) => {
            const matrix1 = transform3d.translate([200, 200, 0])
            const matrix2 = transform3d.rotate(45, [0, 0, 1])

            const matrix = multiplyMatrix(matrix1, matrix2)

            element.style.transform = `matrix3d(${toCssMatrixView(matrix)})`
            this.cubeElement.appendChild(element)
        })
    }

    generateFaceElements() {
        return CUBE_FACES.map((face) => (
            this.createCubeFace(this.colors[face])
        ))
    }

    createCubeFace(faceColor = "") {
        const underlay = document.createElement("div")
        underlay.classList.add(Styles.Underlay)
    
        if (faceColor) {
            const cubeFace = document.createElement("div")
            cubeFace.classList.add(Styles.CubeFace)
    
            cubeFace.style.backgroundColor = faceColor
    
            underlay.appendChild(cubeFace)
        }
    
        return underlay
    }
}
