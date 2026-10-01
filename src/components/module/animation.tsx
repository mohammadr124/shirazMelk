import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber"

import {
  ContactShadows,
  Environment,
  useProgress,
} from "@react-three/drei"

import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader.js"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import * as THREE from "three"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   MOBILE
========================================================= */

function useIsMobile(
  breakpoint = 768,
): boolean {
  const [
    isMobile,
    setIsMobile,
  ] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.innerWidth < breakpoint,
      )
    }

    check()

    window.addEventListener(
      "resize",
      check,
    )

    return () => {
      window.removeEventListener(
        "resize",
        check,
      )
    }
  }, [breakpoint])

  return isMobile
}

/* =========================================================
   CONSTANTS
========================================================= */

const SCROLL_END = "+=400%"

const SCROLL_END_MOBILE = "+=250%"

const MAX_WIDTH = 1440

const ROOF_TEXTURE_URL =
  "/textures/roof.jpg"

const ROOF_DISPLACEMENT_URL =
  "/textures/roof_3_disp_4k.png"

/* =========================================================
   TYPES
========================================================= */

type InfoIconType =
  | "shield"
  | "compass"
  | "layers"
  | "star"

type InfoCard = {
  icon: InfoIconType
  label: string
  value: string
  description: string
}

type StatItem = {
  value: string
  label: string
}

type StoryStep = {
  eyebrow: string
  title: ReactNode
  description: string
  cards: InfoCard[]
  stats?: StatItem[]
}

/* =========================================================
   ROOF KEYWORDS
========================================================= */

const ROOF_KEYWORDS = [
  "roof",
  "rooftop",
  "roof_tile",
  "rooftile",
  "tile",
  "tiles",
  "ceiling",
  "بام",
  "سقف",
]

function isRoofName(
  name: string,
): boolean {
  const value =
    name.toLowerCase().trim()

  return ROOF_KEYWORDS.some(
    (keyword) =>
      value.includes(keyword),
  )
}

/* =========================================================
   ROOF MATERIAL
========================================================= */

function createRoofMaterial(
  roofTexture: THREE.Texture,
  displacementTexture: THREE.Texture,
) {
  const material =
    new THREE.MeshStandardMaterial({
      map: roofTexture,
      bumpMap: displacementTexture,
      bumpScale: 0.22,
      displacementMap: displacementTexture,
      displacementScale: 0.05,
      displacementBias: -0.02,
      color: "#ffffff",
      roughness: 0.88,
      metalness: 0,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })

  return material
}

/* =========================================================
   APPLY ROOF TEXTURE
========================================================= */

function applyRoofTexture(
  material: THREE.Material,
  roofTexture: THREE.Texture,
  displacementTexture: THREE.Texture,
) {
  const nextMaterial =
    material.clone() as
      THREE.MeshStandardMaterial

  nextMaterial.map =
    roofTexture

  nextMaterial.bumpMap =
    displacementTexture

  nextMaterial.bumpScale =
    0.22

  nextMaterial.displacementMap =
    displacementTexture

  nextMaterial.displacementScale =
    0.05

  nextMaterial.displacementBias =
    -0.02

  nextMaterial.color.set(
    "#ffffff",
  )

  nextMaterial.roughness =
    0.88

  nextMaterial.metalness =
    0

  nextMaterial.side =
    THREE.DoubleSide

  nextMaterial.polygonOffset =
    true

  nextMaterial.polygonOffsetFactor =
    -1

  nextMaterial.polygonOffsetUnits =
    -1

  nextMaterial.needsUpdate =
    true

  return nextMaterial
}

/* =========================================================
   BUILD ROOF OVERLAY
========================================================= */

function buildRoofOverlay(
  sourceMesh: THREE.Mesh,
  root: THREE.Group,
  roofTexture: THREE.Texture,
  displacementTexture: THREE.Texture,
) {
  const sourceGeometry =
    sourceMesh.geometry as
      THREE.BufferGeometry

  if (
    !sourceGeometry.attributes
      .position
  ) {
    return null
  }

  const geometry =
    sourceGeometry.index
      ? sourceGeometry.toNonIndexed()
      : sourceGeometry.clone()

  const position =
    geometry.attributes
      .position as THREE.BufferAttribute

  if (
    position.count < 3
  ) {
    return null
  }

  const roofPositions: number[] =
    []

  const roofNormals: number[] =
    []

  const roofUvs: number[] =
    []

  const roofWorldPoints: THREE.Vector3[] =
    []

  const sourceBox =
    new THREE.Box3().setFromObject(
      sourceMesh,
    )

  const minY =
    sourceBox.min.y

  const maxY =
    sourceBox.max.y

  const height =
    Math.max(
      maxY - minY,
      0.001,
    )

  const minimumRoofY =
    maxY -
    Math.max(
      height * 0.34,
      0.35,
    )

  for (
    let i = 0;
    i < position.count;
    i += 3
  ) {
    const a =
      new THREE.Vector3().fromBufferAttribute(
        position,
        i,
      )

    const b =
      new THREE.Vector3().fromBufferAttribute(
        position,
        i + 1,
      )

    const c =
      new THREE.Vector3().fromBufferAttribute(
        position,
        i + 2,
      )

    const worldA =
      a.clone()

    const worldB =
      b.clone()

    const worldC =
      c.clone()

    sourceMesh.localToWorld(
      worldA,
    )

    sourceMesh.localToWorld(
      worldB,
    )

    sourceMesh.localToWorld(
      worldC,
    )

    const edgeA =
      new THREE.Vector3().subVectors(
        worldB,
        worldA,
      )

    const edgeB =
      new THREE.Vector3().subVectors(
        worldC,
        worldA,
      )

    const worldNormal =
      new THREE.Vector3()
        .crossVectors(
          edgeA,
          edgeB,
        )
        .normalize()

    const centroid =
      new THREE.Vector3()
        .add(worldA)
        .add(worldB)
        .add(worldC)
        .multiplyScalar(
          1 / 3,
        )

    const isRoofFace =
      centroid.y >=
        minimumRoofY &&
      worldNormal.y > 0.2

    if (!isRoofFace) {
      continue
    }

    const localEdgeA =
      new THREE.Vector3().subVectors(
        b,
        a,
      )

    const localEdgeB =
      new THREE.Vector3().subVectors(
        c,
        a,
      )

    const localNormal =
      new THREE.Vector3()
        .crossVectors(
          localEdgeA,
          localEdgeB,
        )
        .normalize()

    roofPositions.push(
      a.x,
      a.y,
      a.z,

      b.x,
      b.y,
      b.z,

      c.x,
      c.y,
      c.z,
    )

    roofNormals.push(
      localNormal.x,
      localNormal.y,
      localNormal.z,

      localNormal.x,
      localNormal.y,
      localNormal.z,

      localNormal.x,
      localNormal.y,
      localNormal.z,
    )

    roofWorldPoints.push(
      worldA,
      worldB,
      worldC,
    )
  }

  if (
    roofPositions.length ===
    0
  ) {
    return null
  }

  let minX = Infinity
  let maxX = -Infinity
  let minZ = Infinity
  let maxZ = -Infinity

  roofWorldPoints.forEach(
    (point) => {
      minX =
        Math.min(
          minX,
          point.x,
        )

      maxX =
        Math.max(
          maxX,
          point.x,
        )

      minZ =
        Math.min(
          minZ,
          point.z,
        )

      maxZ =
        Math.max(
          maxZ,
          point.z,
        )
    },
  )

  const width =
    Math.max(
      maxX - minX,
      0.001,
    )

  const depth =
    Math.max(
      maxZ - minZ,
      0.001,
    )

  roofWorldPoints.forEach(
    (point) => {
      const u =
        (point.x - minX) /
        width

      const v =
        (point.z - minZ) /
        depth

      roofUvs.push(
        u,
        v,
      )
    },
  )

  const roofGeometry =
    new THREE.BufferGeometry()

  roofGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      roofPositions,
      3,
    ),
  )

  roofGeometry.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute(
      roofNormals,
      3,
    ),
  )

  roofGeometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute(
      roofUvs,
      2,
    ),
  )

  roofGeometry.computeBoundingBox()

  roofGeometry.computeBoundingSphere()

  const roofMaterial =
    createRoofMaterial(
      roofTexture,
      displacementTexture,
    )

  const overlay =
    new THREE.Mesh(
      roofGeometry,
      roofMaterial,
    )

  overlay.position.copy(
    sourceMesh.position,
  )

  overlay.quaternion.copy(
    sourceMesh.quaternion,
  )

  overlay.scale.copy(
    sourceMesh.scale,
  )

  overlay.castShadow = true
  overlay.receiveShadow = true
  overlay.frustumCulled = false
  overlay.renderOrder = 2

  overlay.userData.isRoofOverlay =
    true

  overlay.userData.animationSource =
    sourceMesh

  root.add(overlay)

  return overlay
}

/* =========================================================
   HOUSE
========================================================= */

function House({
  isMobile,
}: {
  isMobile: boolean
}) {
  const loadedModel =
    useLoader(
      TDSLoader,
      "/models/house2.3DS",
      (loader) => {
        loader.setResourcePath(
          "/models/",
        )
      },
    )

  const [
    roofTexture,
    roofDisplacementTexture,
  ] = useLoader(
    THREE.TextureLoader,
    [
      ROOF_TEXTURE_URL,
      ROOF_DISPLACEMENT_URL,
    ],
  )

  useMemo(() => {
    roofTexture.wrapS =
      THREE.RepeatWrapping

    roofTexture.wrapT =
      THREE.RepeatWrapping

    roofTexture.repeat.set(
      isMobile ? 2.5 : 3.5,
      isMobile ? 2.5 : 3.5,
    )

    roofTexture.colorSpace =
      THREE.SRGBColorSpace

    roofTexture.anisotropy = 8
    roofTexture.needsUpdate = true

    roofDisplacementTexture.wrapS =
      THREE.RepeatWrapping

    roofDisplacementTexture.wrapT =
      THREE.RepeatWrapping

    roofDisplacementTexture.repeat.set(
      isMobile ? 2.5 : 3.5,
      isMobile ? 2.5 : 3.5,
    )

    roofDisplacementTexture.colorSpace =
      THREE.NoColorSpace

    roofDisplacementTexture.anisotropy =
      8

    roofDisplacementTexture.needsUpdate =
      true
  }, [
    roofTexture,
    roofDisplacementTexture,
    isMobile,
  ])

  const model = useMemo(() => {
    const root =
      loadedModel.clone(true)

    root.rotation.set(
      -Math.PI / 2,
      0,
      0,
    )

    root.position.set(
      0,
      0,
      0,
    )

    root.scale.set(
      1,
      1,
      1,
    )

    root.updateMatrixWorld(
      true,
    )

    const meshes: THREE.Mesh[] =
      []

    root.traverse((child) => {
      const mesh =
        child as THREE.Mesh

      if (!mesh.isMesh) {
        return
      }

      meshes.push(mesh)
    })

    meshes.forEach((mesh) => {
      root.attach(mesh)
    })

    root.updateMatrixWorld(
      true,
    )

    meshes.forEach(
      (
        mesh,
        index,
      ) => {
        mesh.userData.animationIndex =
          index
      },
    )

    const modelStructure =
      meshes.map((mesh) => {
        const material =
          mesh.material

        const materialNames =
          Array.isArray(
            material,
          )
            ? material.map(
                (item) =>
                  item.name ||
                  "",
              )
            : [
                material?.name ||
                  "",
              ]

        return {
          meshName:
            mesh.name || "",

          materialNames,

          geometryGroups:
            mesh.geometry.groups,
        }
      })

    let roofMeshesFound = 0
    let roofMaterialsFound = 0

    meshes.forEach((mesh) => {
      const meshIsRoof =
        isRoofName(
          mesh.name || "",
        )

      const material =
        mesh.material

      if (
        Array.isArray(material)
      ) {
        const nextMaterials =
          material.map(
            (item) => {
              const materialIsRoof =
                isRoofName(
                  item.name ||
                    "",
                )

              if (
                meshIsRoof ||
                materialIsRoof
              ) {
                roofMaterialsFound++

                return applyRoofTexture(
                  item,
                  roofTexture,
                  roofDisplacementTexture,
                )
              }

              return item
            },
          )

        const changed =
          nextMaterials.some(
            (
              item,
              index,
            ) =>
              item !==
              material[index],
          )

        if (changed) {
          mesh.material =
            nextMaterials
        }

        if (meshIsRoof) {
          roofMeshesFound++
        }

        return
      }

      const materialIsRoof =
        isRoofName(
          material?.name ||
            "",
        )

      if (
        meshIsRoof ||
        materialIsRoof
      ) {
        roofMeshesFound++
        roofMaterialsFound++

        mesh.material =
          applyRoofTexture(
            material,
            roofTexture,
            roofDisplacementTexture,
          )
      }
    })

    const initialBox =
      new THREE.Box3().setFromObject(
        root,
      )

    const initialSize =
      initialBox.getSize(
        new THREE.Vector3(),
      )

    const maxDimension =
      Math.max(
        initialSize.x,
        initialSize.y,
        initialSize.z,
      )

    const targetSize =
      isMobile ? 5.8 : 7.5

    const normalizationScale =
      maxDimension > 0
        ? targetSize /
          maxDimension
        : 1

    root.scale.setScalar(
      normalizationScale,
    )

    root.updateMatrixWorld(
      true,
    )

    const scaledBox =
      new THREE.Box3().setFromObject(
        root,
      )

    const center =
      scaledBox.getCenter(
        new THREE.Vector3(),
      )

    root.position.x =
      -center.x

    root.position.z =
      -center.z

    root.updateMatrixWorld(
      true,
    )

    const floorBox =
      new THREE.Box3().setFromObject(
        root,
      )

    root.position.y =
      -floorBox.min.y

    root.updateMatrixWorld(
      true,
    )

    const sceneOffsetX =
      isMobile
        ? -3.3
        : -4.8

    const sceneOffsetZ =
      isMobile
        ? 0.8
        : 1.2

    root.position.x +=
      sceneOffsetX

    root.position.z +=
      sceneOffsetZ

    root.updateMatrixWorld(
      true,
    )

    meshes.forEach(
      (
        mesh,
      ) => {
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.frustumCulled = false

        const material =
          mesh.material

        if (
          Array.isArray(material)
        ) {
          material.forEach(
            (item) => {
              item.side =
                THREE.DoubleSide

              item.needsUpdate =
                true
            },
          )
        } else if (
          material
        ) {
          material.side =
            THREE.DoubleSide

          material.needsUpdate =
            true
        }
      },
    )

    const roofOverlays: THREE.Mesh[] =
      []

    if (
      roofMeshesFound === 0 &&
      roofMaterialsFound === 0
    ) {
      meshes.forEach(
        (
          mesh,
        ) => {
          const overlay =
            buildRoofOverlay(
              mesh,
              root,
              roofTexture,
              roofDisplacementTexture,
            )

          if (!overlay) {
            return
          }

          overlay.userData.animationIndex =
            mesh.userData
              .animationIndex

          roofOverlays.push(
            overlay,
          )
        },
      )
    }

    const animatedMeshes =
      [
        ...meshes,
        ...roofOverlays,
      ]

    animatedMeshes.forEach(
      (
        mesh,
        index,
      ) => {
        const animationSource =
          mesh.userData
            .animationSource as
            | THREE.Mesh
            | undefined

        const originalPosition =
          animationSource
            ? (
                animationSource
                  .userData
                  .originalPosition ||
                animationSource
                  .position
              ).clone()
            : mesh.position.clone()

        const originalScale =
          animationSource
            ? (
                animationSource
                  .userData
                  .originalScale ||
                animationSource
                  .scale
              ).clone()
            : mesh.scale.clone()

        const originalRotation =
          animationSource
            ? (
                animationSource
                  .userData
                  .originalRotation ||
                animationSource
                  .rotation
              ).clone()
            : mesh.rotation.clone()

        mesh.userData.originalPosition =
          originalPosition

        mesh.userData.originalScale =
          originalScale

        mesh.userData.originalRotation =
          originalRotation

        const animationIndex =
          animationSource
            ? animationSource
                .userData
                .animationIndex
            : index

        mesh.userData.animationIndex =
          animationIndex

        const xDirection =
          ((animationIndex % 5) -
            2) *
          0.75

        const yDirection =
          1.2 +
          (animationIndex % 6) *
            0.42

        const zDirection =
          ((animationIndex % 7) -
            3) *
          0.35

        const explodedPosition =
          originalPosition
            .clone()
            .add(
              new THREE.Vector3(
                xDirection,
                yDirection,
                zDirection,
              ),
            )

        mesh.userData.explodedPosition =
          explodedPosition

        const explodedRotation =
          new THREE.Euler(
            originalRotation.x +
              ((animationIndex % 2 === 0
                ? 1
                : -1) *
                Math.PI) /
                6,

            originalRotation.y +
              ((animationIndex % 3 === 0
                ? 1
                : -1) *
                Math.PI) /
                7,

            originalRotation.z +
              ((animationIndex % 4 === 0
                ? 1
                : -1) *
                Math.PI) /
                8,
          )

        mesh.userData.explodedRotation =
          explodedRotation

        mesh.position.copy(
          explodedPosition,
        )

        mesh.rotation.copy(
          explodedRotation,
        )

        mesh.scale.set(
          0,
          0,
          0,
        )
      },
    )

    console.log(
      "==============================",
    )

    console.log(
      "3DS MODEL LOADED:",
      root,
    )

    console.log(
      "3DS MODEL SIZE:",
      initialSize,
    )

    console.log(
      "3DS MODEL SCALE:",
      normalizationScale,
    )

    console.log(
      "3DS MESH COUNT:",
      meshes.length,
    )

    console.log(
      "ROOF MESHES FOUND:",
      roofMeshesFound,
    )

    console.log(
      "ROOF MATERIALS FOUND:",
      roofMaterialsFound,
    )

    console.log(
      "ROOF OVERLAYS CREATED:",
      roofOverlays.length,
    )

    console.log(
      "ROOF MAIN TEXTURE:",
      ROOF_TEXTURE_URL,
    )

    console.log(
      "ROOF DISPLACEMENT:",
      ROOF_DISPLACEMENT_URL,
    )

    console.log(
      "MODEL STRUCTURE:",
      modelStructure,
    )

    console.log(
      "MODEL OFFSET:",
      {
        x: sceneOffsetX,
        z: sceneOffsetZ,
      },
    )

    console.log(
      "==============================",
    )

    return root
  }, [
    loadedModel,
    roofTexture,
    roofDisplacementTexture,
    isMobile,
  ])

  /* =======================================================
     MODEL ASSEMBLY SCROLL
  ======================================================= */

  useGSAP(
    () => {
      const meshes: THREE.Mesh[] =
        []

      model.traverse((child) => {
        const mesh =
          child as THREE.Mesh

        if (!mesh.isMesh) {
          return
        }

        meshes.push(mesh)
      })

      if (!meshes.length) {
        return
      }

      const end = isMobile
        ? SCROLL_END_MOBILE
        : SCROLL_END

      const timeline =
        gsap.timeline({
          scrollTrigger: {
            trigger:
              "#house-pin",

            start: "top top",

            end,

            scrub: 1.15,

            invalidateOnRefresh:
              true,

            anticipatePin: 1,
          },
        })

      const maxAnimationIndex =
        meshes.reduce(
          (
            max,
            mesh,
          ) => {
            const value =
              Number(
                mesh.userData
                  .animationIndex ??
                  0,
              )

            return Math.max(
              max,
              value,
            )
          },
          0,
        )

      meshes.forEach(
        (
          mesh,
        ) => {
          const originalPosition =
            mesh.userData
              .originalPosition as
              | THREE.Vector3
              | undefined

          const originalScale =
            mesh.userData
              .originalScale as
              | THREE.Vector3
              | undefined

          const originalRotation =
            mesh.userData
              .originalRotation as
              | THREE.Euler
              | undefined

          const explodedPosition =
            mesh.userData
              .explodedPosition as
              | THREE.Vector3
              | undefined

          const explodedRotation =
            mesh.userData
              .explodedRotation as
              | THREE.Euler
              | undefined

          if (
            !originalPosition ||
            !originalScale ||
            !originalRotation ||
            !explodedPosition ||
            !explodedRotation
          ) {
            return
          }

          const animationIndex =
            Number(
              mesh.userData
                .animationIndex ??
                0,
            )

          const progress =
            animationIndex /
            Math.max(
              maxAnimationIndex,
              1,
            )

          const startTime =
            progress * 10.5

          timeline.set(
            mesh.position,
            {
              x: explodedPosition.x,
              y: explodedPosition.y,
              z: explodedPosition.z,
            },
            startTime,
          )

          timeline.set(
            mesh.rotation,
            {
              x: explodedRotation.x,
              y: explodedRotation.y,
              z: explodedRotation.z,
            },
            startTime,
          )

          timeline.set(
            mesh.scale,
            {
              x: 0,
              y: 0,
              z: 0,
            },
            startTime,
          )

          timeline.to(
            mesh.position,
            {
              x: originalPosition.x,
              y: originalPosition.y,
              z: originalPosition.z,
              duration: 0.9,
              ease: "power4.out",
            },
            startTime,
          )

          timeline.to(
            mesh.rotation,
            {
              x: originalRotation.x,
              y: originalRotation.y,
              z: originalRotation.z,
              duration: 0.95,
              ease: "power3.out",
            },
            startTime,
          )

          timeline.to(
            mesh.scale,
            {
              x: originalScale.x,
              y: originalScale.y,
              z: originalScale.z,
              duration: 0.85,
              ease: "back.out(1.4)",
            },
            startTime,
          )

          const settleTime =
            startTime + 0.72

          timeline.to(
            mesh.scale,
            {
              x:
                originalScale.x *
                1.025,

              y:
                originalScale.y *
                1.025,

              z:
                originalScale.z *
                1.025,

              duration: 0.16,
              ease: "power2.out",
            },
            settleTime,
          )

          timeline.to(
            mesh.scale,
            {
              x: originalScale.x,
              y: originalScale.y,
              z: originalScale.z,
              duration: 0.2,
              ease: "power3.out",
            },
            settleTime + 0.16,
          )
        },
      )

      timeline.to(
        {},
        {
          duration: 4,
        },
        11,
      )

      return () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    },
    {
      dependencies: [
        model,
        isMobile,
      ],

      revertOnUpdate: true,
    },
  )

  return (
    <group>
      <primitive object={model} />
    </group>
  )
}

/* =========================================================
   CAMERA CONTROLLER
========================================================= */

function CameraController({
  isMobile,
}: {
  isMobile: boolean
}) {
  const { camera } =
    useThree()

  useEffect(() => {
    if (isMobile) {
      camera.position.set(
        -0.5,
        5.9,
        -16.8,
      )

      camera.lookAt(
        -3,
        2.9,
        0.8,
      )
    } else {
      camera.position.set(
        -0.3,
        5.5,
        -14.8,
      )

      camera.lookAt(
        -4.2,
        2.9,
        0.8,
      )
    }

    if (
      camera instanceof
      THREE.PerspectiveCamera
    ) {
      camera.fov =
        isMobile
          ? 49
          : 41

      camera.updateProjectionMatrix()
    }
  }, [
    camera,
    isMobile,
  ])

  return null
}

/* =========================================================
   SCROLL CAMERA
========================================================= */

function ScrollController({
  isMobile,
}: {
  isMobile: boolean
}) {
  const { camera } =
    useThree()

  const lookTarget =
    useRef<THREE.Vector3>(
      new THREE.Vector3(
        isMobile ? -3 : -4.2,
        2.9,
        0.8,
      ),
    )

  const fovState =
    useRef({
      value: isMobile
        ? 49
        : 41,
    })

  useFrame(() => {
    camera.lookAt(
      lookTarget.current,
    )

    if (
      camera instanceof
      THREE.PerspectiveCamera
    ) {
      camera.fov +=
        (fovState.current.value -
          camera.fov) *
        0.08

      camera.updateProjectionMatrix()
    }
  })

  useGSAP(
    () => {
      const end = isMobile
        ? SCROLL_END_MOBILE
        : SCROLL_END

      const timeline =
        gsap.timeline({
          scrollTrigger: {
            trigger:
              "#house-pin",

            start: "top top",

            end,

            scrub: 1.15,

            pin: true,

            pinSpacing: true,

            anticipatePin: 1,

            invalidateOnRefresh:
              true,

            fastScrollEnd: false,
          },
        })

      if (isMobile) {
        timeline
          .to(
            camera.position,
            {
              x: -0.7,
              y: 5.8,
              z: -16.8,
              duration: 2,
              ease: "sine.inOut",
            },
            0,
          )

          .to(
            camera.position,
            {
              x: 0.9,
              y: 5.7,
              z: -13.2,
              duration: 2.2,
              ease: "power2.inOut",
            },
            2,
          )

          .to(
            fovState.current,
            {
              value: 43,
              duration: 2.2,
              ease: "power2.out",
            },
            2,
          )

          .to(
            camera.position,
            {
              x: 3.7,
              y: 6.1,
              z: -8,
              duration: 2.4,
              ease: "sine.inOut",
            },
            4.2,
          )

          .to(
            camera.position,
            {
              x: 4.8,
              y: 6.8,
              z: -2.2,
              duration: 2.5,
              ease: "power2.inOut",
            },
            6.6,
          )

          .to(
            fovState.current,
            {
              value: 46,
              duration: 2.5,
              ease: "sine.inOut",
            },
            6.6,
          )

          .to(
            camera.position,
            {
              x: 1,
              y: 8.2,
              z: 1.8,
              duration: 2.5,
              ease: "sine.inOut",
            },
            9.1,
          )

          .to(
            camera.position,
            {
              x: -5.4,
              y: 7.1,
              z: -0.5,
              duration: 2.8,
              ease: "power2.inOut",
            },
            11.6,
          )

          .to(
            fovState.current,
            {
              value: 42,
              duration: 2.8,
              ease: "power2.inOut",
            },
            11.6,
          )

          .to(
            camera.position,
            {
              x: -4.4,
              y: 5.7,
              z: -15.5,
              duration: 1.4,
              ease: "power3.out",
            },
            14.4,
          )

          .to(
            fovState.current,
            {
              value: 44,
              duration: 1.4,
              ease: "power2.out",
            },
            14.4,
          )
      } else {
        timeline
          .to(
            camera.position,
            {
              x: -0.4,
              y: 5.6,
              z: -14.8,
              duration: 2,
              ease: "sine.inOut",
            },
            0,
          )

          .to(
            camera.position,
            {
              x: 2.8,
              y: 5.7,
              z: -11.8,
              duration: 2.2,
              ease: "power2.inOut",
            },
            2,
          )

          .to(
            fovState.current,
            {
              value: 35.5,
              duration: 2.2,
              ease: "power2.out",
            },
            2,
          )

          .to(
            camera.position,
            {
              x: 6.1,
              y: 6.1,
              z: -7.2,
              duration: 2.5,
              ease: "sine.inOut",
            },
            4.2,
          )

          .to(
            camera.position,
            {
              x: 7.4,
              y: 6.8,
              z: -1.5,
              duration: 2.5,
              ease: "power2.inOut",
            },
            6.7,
          )

          .to(
            fovState.current,
            {
              value: 38.5,
              duration: 2.5,
              ease: "sine.inOut",
            },
            6.7,
          )

          .to(
            camera.position,
            {
              x: 2.7,
              y: 8.5,
              z: 3,
              duration: 2.5,
              ease: "sine.inOut",
            },
            9.2,
          )

          .to(
            camera.position,
            {
              x: -6.8,
              y: 7.4,
              z: -0.8,
              duration: 2.8,
              ease: "power2.inOut",
            },
            11.7,
          )

          .to(
            fovState.current,
            {
              value: 34.5,
              duration: 2.8,
              ease: "power2.out",
            },
            11.7,
          )

          .to(
            camera.position,
            {
              x: -5,
              y: 5.7,
              z: -15.8,
              duration: 1.5,
              ease: "power3.out",
            },
            14.5,
          )

          .to(
            fovState.current,
            {
              value: 37,
              duration: 1.5,
              ease: "power2.out",
            },
            14.5,
          )
      }

      timeline.to(
        lookTarget.current,
        {
          x: isMobile ? -3 : -4.2,
          y: isMobile ? 2.9 : 2.9,
          z: 0.8,
          duration: 2.2,
          ease: "sine.inOut",
        },
        0,
      )

      timeline.to(
        lookTarget.current,
        {
          x: isMobile ? -2.7 : -3.8,
          y: isMobile ? 3 : 3.1,
          z: 1.1,
          duration: 2.5,
          ease: "sine.inOut",
        },
        2.2,
      )

      timeline.to(
        lookTarget.current,
        {
          x: isMobile ? -2.4 : -3.4,
          y: isMobile ? 3.2 : 3.4,
          z: 0.7,
          duration: 2.5,
          ease: "power2.inOut",
        },
        4.7,
      )

      timeline.to(
        lookTarget.current,
        {
          x: isMobile ? -2.7 : -3.8,
          y: isMobile ? 3.3 : 3.6,
          z: 0.2,
          duration: 2.5,
          ease: "sine.inOut",
        },
        7.2,
      )

      timeline.to(
        lookTarget.current,
        {
          x: isMobile ? -3.1 : -4.1,
          y: isMobile ? 3.7 : 4,
          z: 0.6,
          duration: 2.5,
          ease: "power2.inOut",
        },
        9.7,
      )

      timeline.to(
        lookTarget.current,
        {
          x: isMobile ? -3.4 : -4.6,
          y: isMobile ? 3.3 : 3.5,
          z: 1,
          duration: 2.6,
          ease: "sine.inOut",
        },
        12.2,
      )

      timeline.to(
        lookTarget.current,
        {
          x: isMobile ? -3.2 : -4.4,
          y: isMobile ? 2.9 : 3,
          z: 0.8,
          duration: 1.3,
          ease: "power3.out",
        },
        14.8,
      )

      return () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    },
    {
      dependencies: [
        camera,
        isMobile,
      ],

      revertOnUpdate: true,
    },
  )

  return null
}

/* =========================================================
   LIGHTING
========================================================= */

function DynamicLighting() {
  const directionalLight =
    useRef<THREE.DirectionalLight>(
      null,
    )

  const ambientLight =
    useRef<THREE.AmbientLight>(
      null,
    )

  useFrame(
    ({ clock }) => {
      const time =
        clock.getElapsedTime()

      if (
        directionalLight.current
      ) {
        directionalLight.current.position.x =
          Math.sin(
            time * 0.08,
          ) * 8

        directionalLight.current.position.z =
          Math.cos(
            time * 0.08,
          ) * 8
      }

      if (
        ambientLight.current
      ) {
        ambientLight.current.intensity =
          1.2 +
          Math.sin(
            time * 0.1,
          ) *
            0.1
      }
    },
  )

  return (
    <>
      <ambientLight
        ref={ambientLight}
        intensity={1.2}
        color="#ffffff"
      />

      <directionalLight
        ref={directionalLight}
        position={[
          8,
          12,
          10,
        ]}
        intensity={3}
        color="#fff7ed"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />

      <pointLight
        position={[
          0,
          5,
          4,
        ]}
        intensity={1.2}
        distance={25}
        color="#fef3c7"
      />

      <pointLight
        position={[
          -6,
          4,
          -6,
        ]}
        intensity={0.6}
        distance={20}
        color="#d4af5a"
      />
    </>
  )
}

/* =========================================================
   MOUSE PARALLAX
========================================================= */

function MouseParallax({
  isMobile,
}: {
  isMobile: boolean
}) {
  const { camera } =
    useThree()

  const target =
    useRef({
      x: 0,
      y: 0,
    })

  const currentOffset =
    useRef({
      x: 0,
      y: 0,
      z: 0,
    })

  useEffect(() => {
    if (isMobile) {
      return
    }

    const handleMouseMove = (
      event: MouseEvent,
    ) => {
      target.current.x =
        (event.clientX /
          window.innerWidth -
          0.5) *
        2

      target.current.y =
        (event.clientY /
          window.innerHeight -
          0.5) *
        2
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove,
    )

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      )
    }
  }, [isMobile])

  useFrame(() => {
    if (
      isMobile ||
      !(
        camera instanceof
        THREE.PerspectiveCamera
      )
    ) {
      return
    }

    const targetX =
      target.current.x * 0.08

    const targetY =
      -target.current.y * 0.04

    const targetZ =
      target.current.x * 0.03

    currentOffset.current.x +=
      (targetX -
        currentOffset.current.x) *
      0.025

    currentOffset.current.y +=
      (targetY -
        currentOffset.current.y) *
      0.025

    currentOffset.current.z +=
      (targetZ -
        currentOffset.current.z) *
      0.025

    camera.position.x +=
      currentOffset.current.x

    camera.position.y +=
      currentOffset.current.y

    camera.position.z +=
      currentOffset.current.z

    currentOffset.current.x *=
      0.94

    currentOffset.current.y *=
      0.94

    currentOffset.current.z *=
      0.94
  })

  return null
}

/* =========================================================
   PARTICLES
========================================================= */

function FloatingParticles({
  isMobile,
}: {
  isMobile: boolean
}) {
  const particles =
    useRef<THREE.Points>(
      null,
    )

  const count = isMobile
    ? 150
    : 350

  const positions =
    useRef<Float32Array>(
      new Float32Array(
        count * 3,
      ),
    )

  if (
    positions.current.every(
      (value) =>
        value === 0,
    )
  ) {
    for (
      let i = 0;
      i < count;
      i++
    ) {
      positions.current[
        i * 3
      ] =
        (Math.random() -
          0.5) *
        25

      positions.current[
        i * 3 + 1
      ] =
        Math.random() * 12

      positions.current[
        i * 3 + 2
      ] =
        (Math.random() -
          0.5) *
        22
    }
  }

  useFrame(() => {
    if (
      !particles.current
    ) {
      return
    }

    particles.current.rotation.y +=
      0.00035
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            positions.current,
            3,
          ]}
          count={count}
        />
      </bufferGeometry>

      <pointsMaterial
        size={
          isMobile
            ? 0.05
            : 0.04
        }
        color="#b08b38"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* =========================================================
   STORY DATA
========================================================= */

const storyData: StoryStep[] =
  [
    {
      eyebrow:
        "01 · ABOUT US",

      title:
        "شیراز ملک، از سال ۱۳۸۲",

      description:
        "بیش از دو دهه است که در زمینه طراحی و اجرای پروژه‌های معماری مدرن فعالیت می‌کنیم.",

      cards: [
        {
          icon: "star",
          label: "افتخارات",
          value: "۲۴ جایزه",
          description:
            "معماری ملی و بین‌المللی",
        },

        {
          icon: "shield",
          label: "گارانتی",
          value: "۱۰ ساله",
          description:
            "ضمانت کامل سازه",
        },

        {
          icon: "compass",
          label: "پروژه",
          value: "۸۵۰+",
          description:
            "موفق در سراسر کشور",
        },
      ],

      stats: [
        {
          value: "۲۲",
          label: "سال تجربه",
        },

        {
          value: "۳۸",
          label: "متخصص",
        },
      ],
    },

    {
      eyebrow:
        "02 · CAPABILITIES",

      title:
        "توانایی‌های اجرایی ما",

      description:
        "از مرحله ایده تا تحویل کلید، تمام مراحل طراحی، مهندسی و اجرا را مدیریت می‌کنیم.",

      cards: [
        {
          icon: "layers",
          label: "طراحی",
          value:
            "معماری، داخلی، منظر",
          description:
            "طراحی سه‌بعدی و BIM",
        },

        {
          icon: "compass",
          label: "مهندسی",
          value:
            "سازه، تأسیسات، برق",
          description:
            "محاسبات دقیق و استاندارد",
        },

        {
          icon: "shield",
          label: "اجرا",
          value:
            "پیمانکاری کامل",
          description:
            "از پی‌ریزی تا دکوراسیون",
        },
      ],

      stats: [
        {
          value: "۴۰",
          label: "پروژه/سال",
        },

        {
          value: "۲۲",
          label: "شهر",
        },
      ],
    },

    {
      eyebrow:
        "03 · EXPERTISE",

      title:
        "حوزه‌های تخصص",

      description:
        "با تیم‌های تخصصی در هر حوزه، پروژه‌ها را با بالاترین کیفیت طراحی و اجرا می‌کنیم.",

      cards: [
        {
          icon: "layers",
          label: "ویلایی",
          value:
            "معماری مسکونی",
          description:
            "ویلا، خانه باغ، مجتمع",
        },

        {
          icon: "star",
          label: "تجاری",
          value:
            "فضاهای اداری",
          description:
            "دفتر، تجاری، هتل",
        },

        {
          icon: "compass",
          label: "منظر",
          value:
            "طراحی فضای سبز",
          description:
            "باغ، محوطه، حیاط",
        },
      ],

      stats: [
        {
          value: "۱۵",
          label: "حوزه تخصص",
        },

        {
          value: "۱۰۰٪",
          label: "رضایت",
        },
      ],
    },

    {
      eyebrow:
        "04 · PHILOSOPHY",

      title:
        "ارزش‌های ما",

      description:
        "ما به شفافیت، تعهد و کیفیت باور داریم. هر پروژه، یک رابطه بلندمدت با مشتریان ما است.",

      cards: [
        {
          icon: "shield",
          label: "تعهد",
          value:
            "تحویل به‌موقع",
          description:
            "قرارداد شفاف و روشن",
        },

        {
          icon: "star",
          label: "کیفیت",
          value:
            "متریال ممتاز",
          description:
            "استاندارد بین‌المللی",
        },

        {
          icon: "compass",
          label: "پشتیبانی",
          value:
            "۲۴/۷ خدمات",
          description:
            "بعد از تحویل هم هستیم",
        },
      ],

      stats: [
        {
          value: "۹۸٪",
          label: "توصیه",
        },

        {
          value: "۵.۰",
          label: "امتیاز",
        },
      ],
    },
  ]

/* =========================================================
   ICON
========================================================= */

function CardIcon({
  type,
}: {
  type: InfoIconType
}) {
  const strokeProps = {
    stroke:
      "currentColor",

    strokeWidth: 1.8,

    strokeLinecap:
      "round" as const,

    strokeLinejoin:
      "round" as const,

    fill: "none",
  }

  if (
    type ===
    "shield"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-2.5 w-2.5"
      >
        <path
          d="M12 2 L20 6 V12 C20 17, 16 21, 12 22 C8 21, 4 17, 4 12 V6 Z"
          {...strokeProps}
        />
      </svg>
    )
  }

  if (
    type ===
    "compass"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-2.5 w-2.5"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          {...strokeProps}
        />

        <path
          d="M15 9 L13 13 L9 15 L11 11 Z"
          {...strokeProps}
        />
      </svg>
    )
  }

  if (
    type ===
    "layers"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-2.5 w-2.5"
      >
        <path
          d="M12 3 L21 8 L12 13 L3 8 Z"
          {...strokeProps}
        />

        <path
          d="M3 13 L12 18 L21 13"
          {...strokeProps}
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-2.5 w-2.5"
    >
      <path
        d="M12 3 L14.6 9 L21 9.6 L16 14.2 L17.5 20.4 L12 17 L6.5 20.4 L8 14.2 L3 9.6 L9.4 9 Z"
        {...strokeProps}
      />
    </svg>
  )
}

/* =========================================================
   STORY OVERLAY
========================================================= */

function StoryOverlay({
  isMobile,
}: {
  isMobile: boolean
}) {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0)

  const lastIndex =
    useRef(0)

  const shellRef =
    useRef<HTMLDivElement>(
      null,
    )

  const contentRef =
    useRef<HTMLDivElement>(
      null,
    )

  useEffect(() => {
    const end = isMobile
      ? SCROLL_END_MOBILE
      : SCROLL_END

    const trigger =
      ScrollTrigger.create({
        trigger:
          "#house-pin",

        start: "top top",

        end,

        onUpdate: (self) => {
          let next = 0

          if (
            self.progress < 0.2
          ) {
            next = 0
          } else if (
            self.progress < 0.5
          ) {
            next = 1
          } else if (
            self.progress < 0.8
          ) {
            next = 2
          } else {
            next = 3
          }

          if (
            next !==
            lastIndex.current
          ) {
            lastIndex.current =
              next

            setActiveIndex(
              next,
            )
          }
        },
      })

    return () => {
      trigger.kill()
    }
  }, [isMobile])

  useEffect(() => {
    if (
      !contentRef.current ||
      !shellRef.current
    ) {
      return
    }

    const content =
      contentRef.current

    const shell =
      shellRef.current

    const eyebrow =
      content.querySelector(
        ".story-eyebrow",
      )

    const line =
      content.querySelector(
        ".story-eyebrow-line",
      )

    const title =
      content.querySelector(
        ".story-title",
      )

    const description =
      content.querySelector(
        ".story-description",
      )

    const cards =
      content.querySelectorAll(
        ".story-card",
      )

    const stats =
      content.querySelector(
        ".story-stats",
      )

    gsap.killTweensOf([
      shell,
      eyebrow,
      line,
      title,
      description,
      cards,
      stats,
    ])

    const tl =
      gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      })

    if (
      activeIndex === 0
    ) {
      tl.fromTo(
        eyebrow,
        {
          opacity: 0,
          y: -20,
          filter:
            "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter:
            "blur(0px)",
          duration: 0.7,
        },
      )

      tl.fromTo(
        line,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.55,
        },
        "-=0.35",
      )

      tl.fromTo(
        title,
        {
          opacity: 0,
          y: -55,
          clipPath:
            "inset(0 0 100% 0)",
          filter:
            "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath:
            "inset(0 0 0% 0)",
          filter:
            "blur(0px)",
          duration: 0.95,
          ease:
            "power4.out",
        },
        "-=0.25",
      )

      tl.fromTo(
        description,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.4",
      )

      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 25,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease:
            "back.out(1.5)",
        },
        "-=0.2",
      )
    }

    if (
      activeIndex === 1
    ) {
      tl.fromTo(
        eyebrow,
        {
          opacity: 0,
          x: 50,
          filter:
            "blur(5px)",
        },
        {
          opacity: 1,
          x: 0,
          filter:
            "blur(0px)",
          duration: 0.7,
        },
      )

      tl.fromTo(
        line,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 0.6,
        },
        "-=0.3",
      )

      tl.fromTo(
        title,
        {
          opacity: 0,
          x: 120,
          skewX: -7,
          clipPath:
            "inset(0 100% 0 0)",
          filter:
            "blur(9px)",
        },
        {
          opacity: 1,
          x: 0,
          skewX: 0,
          clipPath:
            "inset(0 0% 0 0)",
          filter:
            "blur(0px)",
          duration: 1,
          ease:
            "power4.out",
        },
        "-=0.2",
      )

      tl.fromTo(
        description,
        {
          opacity: 0,
          x: 70,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
        },
        "-=0.45",
      )

      tl.fromTo(
        cards,
        {
          opacity: 0,
          x: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
        },
        "-=0.3",
      )
    }

    if (
      activeIndex === 2
    ) {
      tl.fromTo(
        eyebrow,
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
          rotateX: 60,
          filter:
            "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter:
            "blur(0px)",
          duration: 0.75,
          ease:
            "back.out(1.5)",
        },
      )

      tl.fromTo(
        title,
        {
          opacity: 0,
          y: 50,
          scale: 0.75,
          rotateX: 60,
          filter:
            "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter:
            "blur(0px)",
          duration: 1,
          ease:
            "expo.out",
        },
        "-=0.35",
      )

      tl.fromTo(
        description,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
        },
        "-=0.4",
      )

      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.7,
          rotateY: 18,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.55,
          stagger: 0.1,
          ease:
            "back.out(1.6)",
        },
        "-=0.2",
      )
    }

    if (
      activeIndex === 3
    ) {
      if (!isMobile) {
        const rect =
          shell.getBoundingClientRect()

        const overlay =
          shell.parentElement

        const overlayRect =
          overlay?.getBoundingClientRect()

        let leftInset =
          0.08

        if (
          window.innerWidth >=
          1280
        ) {
          leftInset =
            0.12
        } else if (
          window.innerWidth >=
          1024
        ) {
          leftInset =
            0.1
        }

        if (overlayRect) {
          const targetLeft =
            overlayRect.left +
            overlayRect.width *
              leftInset

          const move =
            targetLeft -
            rect.left

          tl.to(
            shell,
            {
              x: move,
              duration: 0.9,
              ease:
                "power4.inOut",
            },
            0,
          )
        }
      }

      tl.fromTo(
        eyebrow,
        {
          opacity: 0,
          x: 35,
          filter:
            "blur(8px)",
        },
        {
          opacity: 1,
          x: 0,
          filter:
            "blur(0px)",
          duration: 0.8,
        },
        0.1,
      )

      tl.fromTo(
        line,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 0.6,
        },
        0.2,
      )

      tl.fromTo(
        title,
        {
          opacity: 0,
          x: 110,
          y: 15,
          scale: 0.9,
          clipPath:
            "inset(0 100% 0 0)",
          filter:
            "blur(10px)",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clipPath:
            "inset(0 0% 0 0)",
          filter:
            "blur(0px)",
          duration: 1,
          ease:
            "power4.out",
        },
        0.25,
      )

      tl.fromTo(
        description,
        {
          opacity: 0,
          x: 60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
        },
        "-=0.55",
      )

      tl.fromTo(
        cards,
        {
          opacity: 0,
          x: 50,
          scale: 0.85,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease:
            "back.out(1.5)",
        },
        "-=0.3",
      )
    }

    return () => {
      tl.kill()
    }
  }, [
    activeIndex,
    isMobile,
  ])

  useEffect(() => {
    if (
      !shellRef.current ||
      isMobile
    ) {
      return
    }

    if (
      activeIndex !== 3
    ) {
      gsap.to(
        shellRef.current,
        {
          x: 0,
          duration: 0.8,
          ease:
            "power4.inOut",
          overwrite: true,
        },
      )
    }
  }, [
    activeIndex,
    isMobile,
  ])

  const current =
    storyData[
      activeIndex
    ]

  if (isMobile) {
    return (
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end">
        <div className="pointer-events-auto w-full bg-linear-to-t from-white via-white/95 to-transparent px-7 pb-6 pt-9">
          <div
            ref={contentRef}
            key={activeIndex}
          >
            <div className="story-eyebrow mb-3 flex items-center justify-between">
              <span className="text-[8px] font-bold tracking-[0.4em] text-[#b08b38]">
                {
                  current.eyebrow
                }
              </span>

              <div className="story-dots flex items-center gap-1">
                {storyData.map(
                  (
                    _,
                    index,
                  ) => (
                    <span
                      key={index}
                      className={`h-0.5 rounded-full transition-all duration-500 ${
                        index ===
                        activeIndex
                          ? "w-5 bg-[#b08b38]"
                          : "w-1 bg-neutral-300"
                      }`}
                    />
                  ),
                )}
              </div>
            </div>

            <h1 className="story-title text-base font-black leading-tight tracking-tight text-neutral-900">
              {
                current.title
              }
            </h1>

            <p className="story-description mt-2 line-clamp-2 text-[10px] leading-5 text-neutral-500">
              {
                current.description
              }
            </p>

            <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] scrollbar-width:none [&::-webkit-scrollbar]:hidden">
              {current.cards.map(
                (
                  card,
                  index,
                ) => (
                  <div
                    key={index}
                    className="story-card flex shrink-0 items-center gap-2 rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1.5 backdrop-blur-sm"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#b08b38] text-white">
                      <CardIcon
                        type={
                          card.icon
                        }
                      />
                    </span>

                    <span className="text-[10px] font-bold text-neutral-900">
                      {
                        card.value
                      }
                    </span>
                  </div>
                ),
              )}
            </div>

            {current.stats && (
              <div className="story-stats mt-3 flex items-center gap-4 text-[10px]">
                {current.stats.map(
                  (
                    stat,
                    index,
                  ) => (
                    <div
                      key={index}
                      className="flex items-baseline gap-1"
                    >
                      <span className="font-black text-[#b08b38]">
                        {
                          stat.value
                        }
                      </span>

                      <span className="text-neutral-400">
                        {
                          stat.label
                        }
                      </span>

                      {index <
                        current
                          .stats!
                          .length -
                          1 && (
                        <span className="mr-2 text-neutral-300">
                          ·
                        </span>
                      )}
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <div
        ref={shellRef}
        className="absolute right-[8%] top-1/2 w-85 -translate-y-1/2 lg:right-[10%] xl:right-[12%]"
        style={{
          transformStyle:
            "preserve-3d",
        }}
      >
        <div
          ref={contentRef}
          key={activeIndex}
          style={{
            transformStyle:
              "preserve-3d",
          }}
        >
          <div className="story-eyebrow mb-3 flex items-center gap-3">
            <span className="text-[9px] font-bold tracking-[0.4em] text-[#b08b38]">
              {
                current.eyebrow
              }
            </span>

            <span className="story-eyebrow-line h-px flex-1 bg-linear-to-l from-transparent to-[#b08b38]/30" />
          </div>

          <h1
            className="story-title text-2xl font-black leading-[1.15] tracking-tight text-neutral-900 lg:text-3xl"
            style={{
              transformStyle:
                "preserve-3d",

              willChange:
                "transform, opacity, filter, clip-path",
            }}
          >
            {
              current.title
            }
          </h1>

          <p
            className="story-description mt-3 text-[12px] leading-6 text-neutral-500"
            style={{
              willChange:
                "transform, opacity, filter, clip-path",
            }}
          >
            {
              current.description
            }
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {current.cards.map(
              (
                card,
                index,
              ) => (
                <div
                  key={index}
                  className="story-card group/pill flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/70 px-3 py-1.5 backdrop-blur-sm transition-all duration-300 hover:border-[#b08b38]/40 hover:bg-white"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-linear-to-br from-[#b08b38] to-[#8a6d2c] text-white">
                    <CardIcon
                      type={
                        card.icon
                      }
                    />
                  </span>

                  <span className="text-[11px] font-bold text-neutral-900">
                    {
                      card.value
                    }
                  </span>
                </div>
              ),
            )}
          </div>

          {current.stats && (
            <div className="story-stats mt-4 flex items-center gap-5 border-t border-neutral-200/70 pt-3">
              {current.stats.map(
                (
                  stat,
                  index,
                ) => (
                  <div
                    key={index}
                    className="flex items-baseline gap-1.5"
                  >
                    <span className="text-lg font-black text-[#b08b38]">
                      {
                        stat.value
                      }
                    </span>

                    <span className="text-[10px] text-neutral-500">
                      {
                        stat.label
                      }
                    </span>
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        <div className="story-dots mt-5 flex items-center gap-1.5">
          {storyData.map(
            (
              _,
              index,
            ) => (
              <span
                key={index}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  index ===
                  activeIndex
                    ? "w-8 bg-linear-to-l from-[#d4af5a] to-[#b08b38]"
                    : "w-1.5 bg-neutral-300"
                }`}
              />
            ),
          )}
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   PROGRESS BAR
========================================================= */

function ProgressBar({
  isMobile,
}: {
  isMobile: boolean
}) {
  const progress =
    useRef<HTMLDivElement>(
      null,
    )

  useEffect(() => {
    const end = isMobile
      ? SCROLL_END_MOBILE
      : SCROLL_END

    const trigger =
      ScrollTrigger.create({
        trigger:
          "#house-pin",

        start: "top top",

        end,

        onUpdate: (self) => {
          if (
            !progress.current
          ) {
            return
          }

          progress.current.style.transform =
            `scaleX(${self.progress})`
        },
      })

    return () => {
      trigger.kill()
    }
  }, [isMobile])

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-0.75 bg-neutral-200/60">
      <div
        ref={progress}
        className="h-full origin-left bg-linear-to-l from-[#d4af5a] via-[#b08b38] to-[#8a6d2c]"
        style={{
          transform:
            "scaleX(0)",
        }}
      />
    </div>
  )
}

/* =========================================================
   SCROLL HINT
========================================================= */

function ScrollHint({
  isMobile,
}: {
  isMobile: boolean
}) {
  const [
    visible,
    setVisible,
  ] = useState(true)

  useEffect(() => {
    const end = isMobile
      ? SCROLL_END_MOBILE
      : SCROLL_END

    const trigger =
      ScrollTrigger.create({
        trigger:
          "#house-pin",

        start: "top top",

        end,

        onUpdate: (self) => {
          setVisible(
            self.progress <
              0.1,
          )
        },
      })

    return () => {
      trigger.kill()
    }
  }, [isMobile])

  if (!visible) {
    return null
  }

  return (
    <div
      className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 text-center ${
        isMobile
          ? "bottom-44"
          : "bottom-8"
      }`}
    >
      <div className="mb-2 text-[9px] tracking-[0.3em] text-neutral-500 md:mb-3 md:text-[10px] md:tracking-[0.4em]">
        اسکرول کنید
      </div>

      <div className="mx-auto h-8 w-5 rounded-full border-2 border-neutral-300 p-1 md:h-10 md:w-6">
        <div className="mx-auto h-1.5 w-1 animate-bounce rounded-full bg-[#b08b38] md:h-2" />
      </div>
    </div>
  )
}

/* =========================================================
   LOADING SCREEN
========================================================= */

function LoadingScreen({
  isMobile,
}: {
  isMobile: boolean
}) {
  const {
    progress,
  } = useProgress()

  const [
    visible,
    setVisible,
  ] = useState(true)

  const [
    fading,
    setFading,
  ] = useState(false)

  const [
    displayProgress,
    setDisplayProgress,
  ] = useState(0)

  const containerRef =
    useRef<HTMLDivElement>(
      null,
    )

  useGSAP(() => {
    if (
      !containerRef.current
    ) {
      return
    }

    const container =
      containerRef.current

    const paths =
      container.querySelectorAll(
        ".load-path",
      )

    const roof =
      container.querySelector(
        ".load-roof",
      )

    const door =
      container.querySelector(
        ".load-door",
      )

    const windows =
      container.querySelectorAll(
        ".load-window",
      )

    const base =
      container.querySelector(
        ".load-base",
      )

    const fill =
      container.querySelector(
        ".load-fill",
      )

    const timeline =
      gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
      })

    if (base) {
      timeline.fromTo(
        base,
        {
          scaleX: 0,
          transformOrigin:
            "center",
        },
        {
          scaleX: 1,
          duration: 0.4,
        },
      )
    }

    if (
      paths.length
    ) {
      timeline.fromTo(
        paths,
        {
          strokeDashoffset: 400,
        },
        {
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.12,
        },
        0.3,
      )
    }

    if (roof) {
      timeline.fromTo(
        roof,
        {
          strokeDashoffset: 400,
        },
        {
          strokeDashoffset: 0,
          duration: 0.6,
        },
        1,
      )
    }

    if (door) {
      timeline.fromTo(
        door,
        {
          strokeDashoffset: 200,
          opacity: 0,
        },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.4,
        },
        1.4,
      )
    }

    if (
      windows.length
    ) {
      timeline.fromTo(
        windows,
        {
          scale: 0,
          opacity: 0,
          transformOrigin:
            "center",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
        },
        1.5,
      )
    }

    if (fill) {
      timeline.fromTo(
        fill,
        {
          opacity: 0,
          scale: 0.8,
          transformOrigin:
            "center",
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
        },
        1.7,
      )
    }

    return () => {
      timeline.kill()
    }
  }, [])

  useEffect(() => {
    const interval =
      setInterval(() => {
        setDisplayProgress(
          (previous) => {
            const target =
              Math.min(
                progress,
                100,
              )

            if (
              previous <
              target
            ) {
              return Math.min(
                previous +
                  Math.ceil(
                    (target -
                      previous) *
                      0.15,
                  ) +
                  1,
                target,
              )
            }

            return previous
          },
        )
      }, 50)

    return () => {
      clearInterval(
        interval,
      )
    }
  }, [progress])

  useEffect(() => {
    if (
      progress >= 100 &&
      displayProgress >= 99 &&
      !fading
    ) {
      const timer =
        setTimeout(() => {
          setFading(true)
        }, 400)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [
    progress,
    displayProgress,
    fading,
  ])

  useEffect(() => {
    if (
      !fading ||
      !containerRef.current
    ) {
      return
    }

    const timeline =
      gsap.timeline({
        onComplete: () => {
          setVisible(false)
        },
      })

    timeline.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.9,
        ease:
          "power2.inOut",
      },
    )

    return () => {
      timeline.kill()
    }
  }, [fading])

  if (!visible) {
    return null
  }

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-linear-to-b from-white via-[#fafaf9] to-[#f5f5f4]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#1c1917 1px, transparent 1px), linear-gradient(90deg, #1c1917 1px, transparent 1px)",

          backgroundSize:
            "40px 40px",
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-[#d4af5a]/8 via-transparent to-transparent blur-3xl md:h-150 md:w-150" />

      <div className="relative z-10 flex flex-col items-center px-6">
        <svg
          viewBox="0 0 240 200"
          className={`fill-none ${
            isMobile
              ? "h-32 w-40"
              : "h-44 w-56 md:h-52 md:w-64"
          }`}
        >
          <line
            className="load-base"
            x1="20"
            y1="180"
            x2="220"
            y2="180"
            stroke="#1c1917"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            className="load-path"
            d="M50 180 L50 100 L190 100 L190 180"
            stroke="#1c1917"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="400"
            strokeDashoffset="400"
          />

          <path
            className="load-roof"
            d="M35 100 L120 30 L205 100"
            stroke="#b08b38"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="400"
            strokeDashoffset="400"
          />

          <path
            className="load-door"
            d="M105 180 L105 140 L135 140 L135 180"
            stroke="#1c1917"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="200"
            strokeDashoffset="200"
          />

          <rect
            className="load-window"
            x="65"
            y="120"
            width="22"
            height="22"
            stroke="#b08b38"
            strokeWidth="2"
            fill="none"
          />

          <rect
            className="load-window"
            x="153"
            y="120"
            width="22"
            height="22"
            stroke="#b08b38"
            strokeWidth="2"
            fill="none"
          />

          <rect
            className="load-fill"
            x="55"
            y="105"
            width="130"
            height="70"
            fill="#b08b38"
            opacity="0.08"
          />
        </svg>

        <div className="mt-6 text-center md:mt-8">
          <h1 className="text-xl font-black tracking-tight text-neutral-900 md:text-2xl lg:text-3xl">
            شیراز ملک
          </h1>

          <p className="mt-2 text-[9px] tracking-[0.4em] text-[#b08b38] md:text-[10px]">
            GOD IS IN THE DETAIL'S
          </p>
        </div>

        <div className="mt-8 w-60 max-w-full md:mt-10 md:w-72">
          <div className="mb-3 flex items-center justify-between text-[10px] md:text-[11px]">
            <span className="tracking-[0.2em] text-neutral-400">
              در حال آماده‌سازی
            </span>

            <span className="font-bold text-[#b08b38]">
              {
                displayProgress
              }٪
            </span>
          </div>

          <div className="relative h-0.75 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-linear-to-l from-[#d4af5a] via-[#b08b38] to-[#8a6d2c] transition-all duration-200"
              style={{
                width: `${displayProgress}%`,
              }}
            />

            <span className="absolute top-0 h-full w-12 animate-[sweep_1.5s_ease-in-out_infinite] bg-linear-to-l from-transparent via-white/70 to-transparent" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sweep {
          0% {
            right: -50px;
            opacity: 0;
          }

          50% {
            opacity: 1;
          }

          100% {
            right: 110%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

/* =========================================================
   MAIN
========================================================= */

export default function AnimationContainer() {
  const isMobile =
    useIsMobile(768)

  return (
    <>
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: `${MAX_WIDTH}px`,
        }}
      >
        <div
          id="house-pin"
          className="relative h-[calc(100svh-5rem)] min-h-155 w-full overflow-hidden bg-linear-to-b from-white via-[#fafaf9] to-[#e7e5e4]"
        >
          <Canvas
            shadows
            dpr={
              isMobile
                ? [1, 1.5]
                : [1, 2]
            }
            camera={{
              position: [
                -0.3,
                5.7,
                -15.2,
              ],

              fov: isMobile
                ? 49
                : 41,

              near: 0.1,

              far: 100,
            }}
            gl={{
              antialias:
                !isMobile,

              alpha: true,

              powerPreference:
                "high-performance",
            }}
            style={{
              background:
                "transparent",
            }}
          >
            <fog
              attach="fog"
              args={[
                "#fafaf9",
                20,
                55,
              ]}
            />

            <CameraController
              isMobile={
                isMobile
              }
            />

            <DynamicLighting />

            <Environment
              preset="city"
              background={
                false
              }
            />

            <MouseParallax
              isMobile={
                isMobile
              }
            />

            <House
              isMobile={
                isMobile
              }
            />

            <ScrollController
              isMobile={
                isMobile
              }
            />

            <FloatingParticles
              isMobile={
                isMobile
              }
            />

            <ContactShadows
              position={[
                0,
                0,
                0,
              ]}
              opacity={0.35}
              scale={25}
              blur={2.5}
              far={10}
              color="#1c1917"
            />

            <mesh
              rotation={[
                -Math.PI / 2,
                0,
                0,
              ]}
              position={[
                0,
                -0.08,
                0,
              ]}
              receiveShadow
            >
              <planeGeometry
                args={[
                  40,
                  40,
                ]}
              />

              <meshStandardMaterial
                color="#f5f5f4"
                roughness={0.95}
              />
            </mesh>
          </Canvas>

          <StoryOverlay
            isMobile={
              isMobile
            }
          />

          <ProgressBar
            isMobile={
              isMobile
            }
          />

          <ScrollHint
            isMobile={
              isMobile
            }
          />
        </div>
      </div>

      <LoadingScreen
        isMobile={
          isMobile
        }
      />
    </>
  )
}