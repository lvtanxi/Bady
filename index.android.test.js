const rewire = require("rewire")
const index_android = rewire("./index.android")
const LaunchView = index_android.__get__("LaunchView")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new LaunchView()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentWillUnmount", () => {
    let inst

    beforeEach(() => {
        inst = new LaunchView()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentWillUnmount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
