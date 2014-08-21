var ffi = require('ffi');
var ref = require('ref');
var Struct = require('ref-struct');
var ArrayType = require('ref-array');
var path = require('path');

var voidPtr = ref.refType(ref.types.void);

var ovrHmd = voidPtr;
var ovrBool = ref.types.char;


var ovrVector2i = Struct({
    'x': ref.types.int,
    'y': ref.types.int
});
exports.ovrVector2i = ovrVector2i;

var ovrSizei = Struct({
    'w': ref.types.int,
    'h': ref.types.int
});
exports.ovrSizei = ovrSizei;

var ovrRecti = Struct({
    Pos: ovrVector2i,
    Size: ovrSizei
});
exports.ovrRecti = ovrRecti;

var ovrQuatf = Struct({
    x: ref.types.float,
    y: ref.types.float,
    z: ref.types.float,
    w: ref.types.float
});
exports.ovrQuatf = ovrQuatf;

var ovrVector2f = Struct({
    x: ref.types.float,
    y: ref.types.float
});
exports.ovrVector2f = ovrVector2f;

var ovrVector3f = Struct({
    x: ref.types.float,
    y: ref.types.float,
    z: ref.types.float
});
exports.ovrVector3f = ovrVector3f;

// TODO: ovrMatrix4f

var ovrPosef = Struct({
    Orientation: ovrQuatf,
    Position: ovrVector3f
});
exports.ovrPosef = ovrPosef;

var ovrPoseStatef = Struct({
    Pose: ovrPosef,
    AngularVelocity: ovrVector3f,
    LinearVelocity: ovrVector3f,
    AngularAcceleration: ovrVector3f,
    LinearAcceleration: ovrVector3f,
    TimeInSeconds: ref.types.double
});
exports.ovrPoseStatef = ovrPoseStatef;

var ovrFovPort = Struct({
    UpTan: ref.types.float,
    DownTan: ref.types.float,
    LeftTan: ref.types.float,
    RightTan: ref.types.float
});
exports.ovrFovPort = ovrFovPort;

exports.ovrHmdCap_Present = ovrHmdCap_Present = 0x0001;
exports.ovrHmdCap_Available = ovrHmdCap_Available = 0x0002;
exports.ovrHmdCap_Captured = ovrHmdCap_Captured = 0x0004;
exports.ovrHmdCap_ExtendDesktop = ovrHmdCap_ExtendDesktop = 0x0008;
exports.ovrHmdCap_NoMirrorToWindow = ovrHmdCap_NoMirrorToWindow = 0x2000;
exports.ovrHmdCap_DisplayOff = ovrHmdCap_DisplayOff = 0x0040;

exports.ovrHmdCap_LowPersistence = ovrHmdCap_LowPersistence = 0x0080;
exports.ovrHmdCap_DynamicPrediction = ovrHmdCap_DynamicPrediction = 0x0200;
exports.ovrHmdCap_NoVSync = ovrHmdCap_NoVSync = 0x1000;
exports.ovrHmdCap_Writable_Mask = ovrHmdCap_Writable_Mask = 0x33f0;
exports.ovrHmdCap_Service_Mask = ovrHmdCap_Service_Mask = 0x23f0;

exports.ovrTrackingCap_Orientation = ovrTrackingCap_Orientation = 0x0010;
exports.ovrTrackingCap_MagYawCorrection = ovrTrackingCap_MagYawCorrection = 0x0020;
exports.ovrTrackingCap_Position = ovrTrackingCap_Position = 0x0040;
exports.ovrTrackingCap_Idle = ovrTrackingCap_Idle = 0x0100;

exports.ovrDistortionCap_Chromatic = ovrDistortionCap_Chromatic = 0x01;     /// Supports chromatic aberration correction.
exports.ovrDistortionCap_TimeWarp = ovrDistortionCap_TimeWarp = 0x02;     /// Supports timewarp.
exports.ovrDistortionCap_Vignette = ovrDistortionCap_Vignette = 0x08;     /// Supports vignetting around the edges of the view.
exports.ovrDistortionCap_NoRestore = ovrDistortionCap_NoRestore = 0x10;     ///  Do not save and restore the graphics state when rendering distortion.
exports.ovrDistortionCap_FlipInput = ovrDistortionCap_FlipInput = 0x20;     ///  Flip the vertical texture coordinate of input images.
exports.ovrDistortionCap_SRGB = ovrDistortionCap_SRGB = 0x40;     ///  Assume input images are in sRGB gamma-corrected color space.
exports.ovrDistortionCap_Overdrive = ovrDistortionCap_Overdrive = 0x80;     ///  Overdrive brightness transitions to reduce artifacts on DK2+ displays
exports.ovrDistortionCap_ProfileNoTimewarpSpinWaits = ovrDistortionCap_ProfileNoTimewarpSpinWaits = 0x10000;  /// Use when profiling with timewarp to remove false

exports.ovrEye_Left = ovrEye_Left = 0;
exports.ovrEye_Right = ovrEye_Right = 1;
exports.ovrEye_count = ovrEye_Count = 2;
exports.ovrEyeType = ovrEyeType = ref.types.uint32;

var ovrHmdDesc = Struct({
    Handle: ovrHmd,
    Type: ref.types.uint32,
    ProductName: ref.types.CString,
    Manufacturer: ref.types.CString,
    VendorId: ref.types.short,
    ProductId: ref.types.short,
    SerialNumber: ArrayType(ref.types.char, 24),
    FirmwareMajor: ref.types.short,
    FirmwareMinor: ref.types.short,
    CameraFrustumHFovInRadians: ref.types.float,
    CameraFrustumVFovInRadians: ref.types.float,
    CameraFrustumNearZInMeters: ref.types.float,
    CameraFrustumFarZInMeters: ref.types.float,
    HmdCaps: ref.types.uint32,
    TrackingCaps: ref.types.uint32,
    DistortionCaps: ref.types.uint32,
    DefaultEyeFov: ArrayType(ovrFovPort, ovrEye_Count),
    MaxEyeFov: ArrayType(ovrFovPort, ovrEye_Count),
    EyeRenderOrder: ArrayType(ref.types.uint32, ovrEye_Count),
    Resolution: ovrSizei,
    WindowsPos: ovrVector2i,
    DisplayDeviceName: ref.types.CString,
    DisplayId: ref.types.long
});
var ovrHmdDescPtr = ref.refType(ovrHmdDesc);
exports.ovrHmdDesc = ovrHmdDesc;

exports.ovrStatus_OrientationTracked = ovrStatus_OrientationTracked = 0x0001;   /// Orientation is currently tracked (connected and in use).
exports.ovrStatus_PositionTracked = ovrStatus_PositionTracked = 0x0002;   /// Position is currently tracked (false if out of range).
exports.ovrStatus_CameraPoseTracked = ovrStatus_CameraPoseTracked = 0x0004;   /// Camera pose is currently tracked.
exports.ovrStatus_PositionConnected = ovrStatus_PositionConnected = 0x0020;   /// Position tracking hardware is connected.
exports.ovrStatus_HmdConnected = ovrStatus_HmdConnected = 0x0080;    /// HMD Display is available and connected.

var ovrSensorData = Struct({
    Accelerometer: ovrVector3f,
    Gyro: ovrVector3f,
    Magnetometer: ovrVector3f,
    Temperature: ref.types.float,
    TimeInSeconds: ref.types.float
});
exports.ovrSensorData = ovrSensorData;

var ovrTrackingState = Struct({
    HeadPose: ovrPoseStatef,
    CameraPose: ovrPosef,
    LeveledCameraPose: ovrPosef,
    RawSensorData: ovrSensorData,
    StatusFlags: ref.types.uint32
});
exports.ovrTrackingState = ovrTrackingState;

var ovrFrameTiming = Struct({
    DeltaSeconds: ref.types.float,
    ThisFrameSeconds: ref.types.double,
    TimewarpPointSeconds: ref.types.double,
    NextFrameSeconds: ref.types.double,
    ScanoutMidpointSeconds: ref.types.double,
    EyeScanoutSeconds: ArrayType(ref.types.double, 2)
});
exports.ovrFrameTiming = ovrFrameTiming;

var ovrEyeRenderDesc = Struct({
    Eye: ovrEyeType,
    Fov: ovrFovPort,
    DistortedViewport: ovrRecti,
    PixelsPerTanAngleAtCenter: ovrVector2f,
    ViewAdjust: ovrVector3f
});
exports.ovrEyeRenderDesc = ovrEyeRenderDesc;



var libovr = ffi.Library(path.resolve(__dirname, 'libovr'), {
    ovr_Initialize: [ovrBool, []],
    ovr_Shutdown: [ref.types.void, []],
    ovrHmd_Create: [ovrHmd, [ref.types.int]],
    ovrHmd_Destroy: [ref.types.void, [ovrHmd]],
    ovr_GetTimeInSeconds: [ref.types.double, []],
    ovrHmd_ConfigureTracking: [ovrBool, [ovrHmd, ref.types.uint32, ref.types.uint32]],
    ovrHmd_GetTrackingState: [ovrTrackingState, [ovrHmd, ref.types.double]],

    //ovrHmd_GetDesc: [ref.types.void, [ovrHmd, ovrHmdDescPtr]],
    // ovrHmd_StartSensor: [ovrBool, [ovrHmd, ref.types.uint32, ref.types.uint32]],
    // ovrHmd_GetSensorState: [ovrSensorState, [ovrHmd, ref.types.double]],
    // ovrHmd_ResetSensor: [ref.types.void, [ovrHmd]],
    // ovrHmd_GetRenderDesc: [ovrEyeRenderDesc, [ovrHmd, ovrEyeType, ovrFovPort]],
});

exports.ovr_Initialize = libovr.ovr_Initialize;
exports.ovr_Shutdown = libovr.ovr_Shutdown;
exports.ovrHmd_Create = libovr.ovrHmd_Create;
exports.ovrHmd_Destroy = libovr.ovrHmd_Destroy;
exports.ovr_GetTimeInSeconds = libovr.ovr_GetTimeInSeconds;
exports.ovrHmd_ConfigureTracking = libovr.ovrHmd_ConfigureTracking;
exports.ovrHmd_GetTrackingState = libovr.ovrHmd_GetTrackingState;

// exports.ovrHmd_GetDesc = libovr.ovrHmd_GetDesc;
// exports.ovrHmd_StartSensor = libovr.ovrHmd_StartSensor;

// exports.ovrHmd_ResetSensor = libovr.ovrHmd_ResetSensor;
// exports.ovrHmd_GetRenderDesc = libovr.ovrHmd_GetRenderDesc;
