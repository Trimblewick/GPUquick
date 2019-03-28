


float4 VSMain(uint id : SV_VertexId) : SV_Position
{
    float4 position = (float4) 0;

    if (id == 0)
        position = float4(-0.5f, -0.5f, 0.0f, 1.0f);
    if (id == 1)
        position = float4(0.0f, 0.5f, 0.0f, 1.0f);
    if (id == 2)
        position = float4(0.5f, -0.5f, 0.0f, 1.0f);

    return position;
}

