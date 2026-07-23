import * as THREE from "three";

export interface CameraFrame {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
}

export interface HeroAnimationState {
  cameraPos: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  cameraFov: number;
  plateOpacity: number;
  plateScale: number;
  plateRotationSpeed: number;
  gymOpacity: number;
  athleteProgress: number; // 0.0 to 1.0 deadlift animation scrub
  textPhase: "hero" | "transition" | "gym" | "lockout";
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function lerpVec(out: THREE.Vector3, v1: THREE.Vector3, v2: THREE.Vector3, t: number): THREE.Vector3 {
  const clampedT = Math.max(0, Math.min(1, t));
  out.x = v1.x + (v2.x - v1.x) * clampedT;
  out.y = v1.y + (v2.y - v1.y) * clampedT;
  out.z = v1.z + (v2.z - v1.z) * clampedT;
  return out;
}

export class AnimationController {
  private static vPos = new THREE.Vector3();
  private static vTarget = new THREE.Vector3();

  public static getFrame(progress: number): HeroAnimationState {
    const p = Math.max(0, Math.min(1, progress));

    const state: HeroAnimationState = {
      cameraPos: new THREE.Vector3(0, 0, 10),
      cameraTarget: new THREE.Vector3(0, 0, 0),
      cameraFov: 45,
      plateOpacity: 1,
      plateScale: 1,
      plateRotationSpeed: 1,
      gymOpacity: 0,
      athleteProgress: 0,
      textPhase: "hero",
    };

    if (p <= 0.2) {
      // 0% -> 20%: Plate rotates slowly, camera approaches from z=10 to z=4
      const t = p / 0.2;
      lerpVec(state.cameraPos, new THREE.Vector3(0, 0, 10), new THREE.Vector3(0, 0, 4), t);
      lerpVec(state.cameraTarget, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), t);
      state.cameraFov = lerp(45, 40, t);
      state.plateOpacity = 1;
      state.plateScale = 1;
      state.plateRotationSpeed = lerp(1, 0.5, t);
      state.gymOpacity = 0;
      state.textPhase = "hero";
    } else if (p <= 0.4) {
      // 20% -> 40%: Camera enters center hole (z=4 -> z=0.1)
      const t = (p - 0.2) / 0.2;
      lerpVec(state.cameraPos, new THREE.Vector3(0, 0, 4), new THREE.Vector3(0, 0, 0.1), t);
      lerpVec(state.cameraTarget, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -2), t);
      state.cameraFov = lerp(40, 65, t);
      state.plateOpacity = lerp(1, 0.3, t);
      state.plateScale = lerp(1, 1.3, t);
      state.plateRotationSpeed = 0.2;
      state.gymOpacity = lerp(0, 0.4, t);
      state.textPhase = "transition";
    } else if (p <= 0.55) {
      // 40% -> 55%: Transition to gym (camera through hole z=0.1 -> gym entrance)
      const t = (p - 0.4) / 0.15;
      lerpVec(state.cameraPos, new THREE.Vector3(0, 0, 0.1), new THREE.Vector3(0, 1.8, 6), t);
      lerpVec(state.cameraTarget, new THREE.Vector3(0, 0, -2), new THREE.Vector3(0, 1.0, 0), t);
      state.cameraFov = lerp(65, 50, t);
      state.plateOpacity = lerp(0.3, 0, t);
      state.plateScale = lerp(1.3, 2.0, t);
      state.gymOpacity = lerp(0.4, 1.0, t);
      state.athleteProgress = 0;
      state.textPhase = "gym";
    } else if (p <= 0.7) {
      // 55% -> 70%: Athlete grips bar
      const t = (p - 0.55) / 0.15;
      lerpVec(state.cameraPos, new THREE.Vector3(0, 1.8, 6), new THREE.Vector3(0, 0.9, 3.8), t);
      lerpVec(state.cameraTarget, new THREE.Vector3(0, 1.0, 0), new THREE.Vector3(0, 0.8, 0), t);
      state.cameraFov = 50;
      state.plateOpacity = 0;
      state.gymOpacity = 1;
      state.athleteProgress = lerp(0, 0.25, t); // Athlete bending down to grip bar
      state.textPhase = "gym";
    } else if (p <= 0.85) {
      // 70% -> 85%: Deadlift reaches lockout
      const t = (p - 0.7) / 0.15;
      lerpVec(state.cameraPos, new THREE.Vector3(0, 0.9, 3.8), new THREE.Vector3(0, 1.5, 4.2), t);
      lerpVec(state.cameraTarget, new THREE.Vector3(0, 0.8, 0), new THREE.Vector3(0, 1.4, 0), t);
      state.cameraFov = lerp(50, 45, t);
      state.plateOpacity = 0;
      state.gymOpacity = 1;
      state.athleteProgress = lerp(0.25, 1.0, t); // Full deadlift pull to lockout
      state.textPhase = "lockout";
    } else {
      // 85% -> 100%: Camera rises revealing "FORGE YOUR STRENGTH"
      const t = (p - 0.85) / 0.15;
      lerpVec(state.cameraPos, new THREE.Vector3(0, 1.5, 4.2), new THREE.Vector3(0, 2.5, 5.5), t);
      lerpVec(state.cameraTarget, new THREE.Vector3(0, 1.4, 0), new THREE.Vector3(0, 1.2, 0), t);
      state.cameraFov = 45;
      state.plateOpacity = 0;
      state.gymOpacity = 1;
      state.athleteProgress = 1.0; // Maintain lockout pose
      state.textPhase = "lockout";
    }

    return state;
  }
}
