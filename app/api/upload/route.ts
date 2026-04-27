import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    console.log(`Received ${files.length} files`);
    files.forEach(file => {
      console.log(`File: ${file.name}, Size: ${file.size}, Type: ${file.type}`);
    });

    // 여기서 실제 보안 분석 로직을 수행하거나 다른 백엔드 서비스로 전달할 수 있습니다.
    // 현재는 업로드 성공을 시뮬레이션합니다.

    // 분석 ID 생성 (예시)
    const analysisId = 'analysis-' + Math.random().toString(36).substring(2, 9);

    return NextResponse.json({
      success: true,
      message: 'Files uploaded successfully',
      analysisId
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
