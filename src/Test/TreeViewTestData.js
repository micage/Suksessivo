let human = {
    Vector3: { x: 0, y: 0, z: 0 },
    Quaternion: { vector: { x: 0, y: 0, z: 1 }, scalar: 0 },
    InertiaFrame: {
        mass: 100,
        position: { x: 1212.54, y: 44.01, z: -7.0032 },
        velocity: { x: 0.54, y: 0.015, z: -0.0032 },
        acceleration: { x: 0, y: 0, z: 0 }, // net force
        orientation: { vector: { x: 0, y: 0, z: 1 }, scalar: 0 },
        angularVelocity: { x: 0, y: 0, z: 0 },
        angularAcceleration: { x: 0, y: 0, z: 0 } // net torque
    },
    Human: {
        Pelvis: {
            Spine: {
                Shoulder: {
                    Neck: {
                        Head: {}
                    },
                    LeftArm: {
                        LowerArm: {
                            Hand: {
                                Palm: {
                                    Thumb: {
                                        Thumb2: {
                                            Thumb3: {}
                                        }
                                    },
                                    finger1: ["bone1", "bone2", "bone3"],
                                    finger2: ["bone1", "bone2", "bone3"],
                                    finger3: ["bone1", "bone2", "bone3"],
                                    finger4: ["bone1", "bone2", "bone3"]
                                }
                            }
                        }
                    },
                    RightArm: {
                        LowerArm: {
                            Hand: {
                                Palm: {
                                    Thumb: {
                                        Thumb2: {
                                            Thumb3: {}
                                        }
                                    },
                                    finger1: ["bone1", "bone2", "bone3"],
                                    finger2: ["bone1", "bone2", "bone3"],
                                    finger3: ["bone1", "bone2", "bone3"],
                                    finger4: ["bone1", "bone2", "bone3"]
                                }
                            }
                        }
                    }
                }
            },
            LeftLeg: {
                LowerLeg: {
                    Foot: {
                        Toes: ["bigtoe", "toe1", "toe2", "toe3", "toe4"]
                    }
                }
            },
            RightLeg: {
                LowerLeg: {
                    Foot: {
                        Toes: ["bigtoe", "toe1", "toe2", "toe3", "toe4"]
                    }
                }
            }
        }
    },
    eof: 1
};

let data1 = {
    arr: [1, 2, 3],
    Employees: [
        {
            name: "Gustave Ganse",
            age: 42,
            job: { city: "Berlin", type: "IT" }
        },
        {
            name: "Babette Sorglos",
            age: 23,
            job: { city: "Berlin", type: "Design" }
        }
    ],
    i1: {
        i11: {
            i111: { x: 0, y: 0, w: 400 },
            i112: "undefined"
        },
        i12: "i12"
    },
    i2: "i2",
    i3: "i3"
};

let afterfx = {
    project: {
        name: "Untitled",
        duration: 30,
        compositions: {
            composition: {
                name: 'Comp1',
                layers: {
                    layer: {
                        name: '',
                        property: 'Opacity',
                        keyframes: [
                            {
                                time: 0.12,
                                value: 0.7,
                                in: 'ease',
                                out: 'linear'
                            }
                        ]
                    }
                }
            }
        },
    }
};

export { human, data1, afterfx };
