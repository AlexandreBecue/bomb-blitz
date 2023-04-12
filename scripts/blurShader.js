export const blurShader = `
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uMainSampler;

void main() {
    vec4 sum = vec4(0.0);

    vec2 tex_offset = 1.0 / vec2(textureSize(uMainSampler, 0));

    sum += texture2D(uMainSampler, vTextureCoord + vec2(-1.0, -1.0) * tex_offset) * 0.077847;
    sum += texture2D(uMainSampler, vTextureCoord + vec2(0.0, -1.0) * tex_offset) * 0.123317;
    sum += texture2D(uMainSampler, vTextureCoord + vec2(1.0, -1.0) * tex_offset) * 0.077847;

    sum += texture2D(uMainSampler, vTextureCoord + vec2(-1.0, 0.0) * tex_offset) * 0.123317;
    sum += texture2D(uMainSampler, vTextureCoord + vec2(0.0, 0.0) * tex_offset) * 0.195346;
    sum += texture2D(uMainSampler, vTextureCoord + vec2(1.0, 0.0) * tex_offset) * 0.123317;

    sum += texture2D(uMainSampler, vTextureCoord + vec2(-1.0, 1.0) * tex_offset) * 0.077847;
    sum += texture2D(uMainSampler, vTextureCoord + vec2(0.0, 1.0) * tex_offset) * 0.123317;
    sum += texture2D(uMainSampler, vTextureCoord + vec2(1.0, 1.0) * tex_offset) * 0.077847;

    gl_FragColor = sum;
}
`;
