#include <windows.h>;
#include <d3d11.h>;
#include <d3dcompiler.h>

#pragma comment(lib, "d3d11.lib")
#pragma comment(lib,"d3dcompiler.lib")


LRESULT CALLBACK WindowProcedure(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam);

INT WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE, PWSTR pCmdLine, int nCmdShow)
{
	float windowWidth = 800;
	float windowHeight = 600;

	// Register the window class.
	const wchar_t CLASS_NAME[] = L"Sample Window Class";

	WNDCLASS wc = {};

	wc.lpfnWndProc = WindowProcedure;
	wc.hInstance = hInstance;
	wc.lpszClassName = CLASS_NAME;

	RegisterClass(&wc);

	//Create the window.
	HWND hwnd = CreateWindowEx(
								0, 
								CLASS_NAME, 
								L"Window Display Name",
								WS_OVERLAPPEDWINDOW, 
								CW_USEDEFAULT, 
								CW_USEDEFAULT, 
								windowWidth,
								windowHeight, 
								NULL, 
								NULL, 
								hInstance, 
								NULL);


	if (hwnd == NULL)
	{
		return 0;
	}

	ShowWindow(hwnd, nCmdShow);

	// INIT DIRECTX
	UINT createDeviceFlags = D3D11_CREATE_DEVICE_DEBUG;
	ID3D11Device* device = nullptr;
	ID3D11DeviceContext* deviceContext = nullptr;
	IDXGISwapChain* swapChain = nullptr;
	ID3D11RenderTargetView* renderTargetView = nullptr;
	ID3D11Texture2D* backBufferTexture = nullptr;
	D3D_DRIVER_TYPE driverType = D3D_DRIVER_TYPE_HARDWARE;
	D3D_FEATURE_LEVEL featureLevel = D3D_FEATURE_LEVEL_11_0;
	D3D11_VIEWPORT viewPort;
	ID3D11VertexShader* vertexShader = nullptr;
	ID3D11PixelShader* pixelShader = nullptr;


	//CREATE SWAP CHAIN
	DXGI_SWAP_CHAIN_DESC swapChainDesc;
	swapChainDesc.BufferCount = 1;
	swapChainDesc.BufferDesc.Width = windowWidth;
	swapChainDesc.BufferDesc.Height = windowHeight;
	swapChainDesc.BufferDesc.Format = DXGI_FORMAT_R8G8B8A8_UNORM;
	swapChainDesc.BufferDesc.RefreshRate.Numerator = 60;
	swapChainDesc.BufferDesc.RefreshRate.Denominator = 1;
	swapChainDesc.BufferUsage = DXGI_USAGE_RENDER_TARGET_OUTPUT;
	swapChainDesc.OutputWindow = hwnd;
	swapChainDesc.SwapEffect = DXGI_SWAP_EFFECT_DISCARD;
	swapChainDesc.Windowed = true;
	swapChainDesc.SampleDesc.Count = 1;
	swapChainDesc.SampleDesc.Quality = 0;
	swapChainDesc.Flags = DXGI_SWAP_CHAIN_FLAG_ALLOW_MODE_SWITCH;

	HRESULT hr = D3D11CreateDeviceAndSwapChain(NULL, driverType, NULL,
		createDeviceFlags, &featureLevel, 1, D3D11_SDK_VERSION, &swapChainDesc,
		&swapChain, &device, NULL, &deviceContext);

	//CREATE RENDERTARGETVIEW
	swapChain->GetBuffer(NULL, __uuidof(ID3D11Texture2D),
		reinterpret_cast<void**>(&backBufferTexture));

	device->CreateRenderTargetView(backBufferTexture, nullptr, &renderTargetView);

	//bind the rendertargetview
	deviceContext->OMSetRenderTargets(1, &renderTargetView, nullptr);

	//CREATE VIEWPORT
	viewPort.Width = static_cast<float>(windowWidth);
	viewPort.Height = static_cast<float>(windowHeight);
	viewPort.TopLeftX = 0;
	viewPort.TopLeftY = 0;
	viewPort.MinDepth = 0.0f;
	viewPort.MaxDepth = 1.0f;

	//bind the viewport
	deviceContext->RSSetViewports(1, &viewPort);
	//DONE


	ID3DBlob* shaderBlob;
	D3DCompileFromFile(L"VertexShader.hlsl", 
						NULL, 
						D3D_COMPILE_STANDARD_FILE_INCLUDE, 
						"VSMain", 
						"vs_5_0", 
						NULL, 
						NULL, 
						&shaderBlob, 
						nullptr);
	
	hr = device->CreateVertexShader(shaderBlob->GetBufferPointer(), 
									shaderBlob->GetBufferSize(), nullptr, 
									&vertexShader);

	D3DCompileFromFile(L"PixelShader.hlsl", 
						NULL, 
						D3D_COMPILE_STANDARD_FILE_INCLUDE, 
						"PSMain", 
						"ps_5_0", 
						NULL, 
						NULL, 
						&shaderBlob,
						nullptr);

	hr = device->CreatePixelShader(shaderBlob->GetBufferPointer(), 
									shaderBlob->GetBufferSize(), 
									nullptr, 
									&pixelShader);

	shaderBlob->Release();

	// Run the message loop.
	MSG msg = {};
	while (GetMessage(&msg, NULL, 0, 0))
	{
		TranslateMessage(&msg);
		DispatchMessage(&msg);

		float clearColor[4] = { 1, 0, 0, 1 };
		deviceContext->ClearRenderTargetView(renderTargetView, clearColor);

		deviceContext->IASetPrimitiveTopology(D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST);
		deviceContext->VSSetShader(vertexShader, nullptr, 0);
		deviceContext->PSSetShader(pixelShader, nullptr, 0);

		deviceContext->Draw(3, 0);

		swapChain->Present(0, 0);
	}

	//dont forget to release id3d11
	vertexShader->Release();
	pixelShader->Release();
	backBufferTexture->Release();
	renderTargetView->Release();
	swapChain->Release();
	deviceContext->Release();
	device->Release();

	return 0;
}

LRESULT CALLBACK WindowProcedure(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
	switch (uMsg)
	{
	case WM_DESTROY:
		PostQuitMessage(0);
		return 0;

	}
	return DefWindowProc(hwnd, uMsg, wParam, lParam);
}