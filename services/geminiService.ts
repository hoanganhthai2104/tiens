import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Difficulty } from '../types';

const ocrText = `
BỘ SUNG CANXI DÀNH CHO TRẺ EM TIENS
HIGH CALCIUM POWDER FOR CHILDREN
Mục lục: Bốn nền tảng của sức khỏe, Can xi và sức khỏe, Bổ sung canxi dành cho trẻ em, Giải thưởng danh dự của Canxi Tiens.
4 nền tảng của sức khỏe: Bữa ăn hợp lý, Cân bằng tâm lý, Vận động khoa học, Từ bỏ thuốc lá Hạn chế rượu.
Canxi là nguyên tố khoáng dồi dào nhất trong cơ thể con người, còn được gọi là "nguyên tố sự sống", là thành phần chính của xương và răng của cơ thể, duy trì hoạt động thần kinh và não bộ, cân bằng axit-bazơ trong cơ thể và bình thường. chức năng của tế bào.
TÁC DỤNG CANXI: Tham gia chức năng sinh lý khác nhau trong tế bào, Dẫn truyền xung thần kinh, Tham gia quá trình đông máu, Co và thư giãn các cơ, Tăng tốc độ thực bào của bạch cầu.
ĐI CHUYỂN CANXI: Thiếu canxi thời gian dài khiến nồng độ canxi trong máu thấp. 99% Canxi ở xương, 1% Canxi ở máu. "Di chuyển canxi" là một đặc điểm điển hình của lão hóa.
MẬT ĐỘ XƯƠNG: Khoảng 35 tuổi, Mật độ xương đạt đến đỉnh điểm và sau đó bắt đầu giảm dần ! Khi chúng ta già đi, ngày càng xuất hiện nhiều triệu chứng như tư thế bất thường, đau lưng, khó chịu về xương khớp, và đây thường là do loãng xương, do thiếu canxi.
TÁC HẠI CỦA THIẾU CANXI: Chân hình X, chữ O, Mọc răng muộn; Cơ thể thấp nhỏ, Bất thường về thần kinh xương và cơ; Khó chịu, quấy khóc, không vâng lời, nóng nảy; Ảnh hưởng đến trí thông minh, suy yếu khả năng miễn dịch. đều có liên quan đến việc cơ thể thiếu canxi !
Kịp thời dự phòng thiếu canxi ở trẻ em: Trẻ em cần bổ sung canxi. Đảm bảo cung cấp đủ canxi trong chế độ ăn uống. Hàm lượng canxi dồi dào nhất là sữa và các sản phẩm từ sữa, bao gồm sữa mẹ, sữa bò, sữa dê. Bổ sung thêm một số canxi. Trên cơ sở cân đối dinh dưỡng, nếu trẻ lớn nhanh có thể bổ sung thêm canxi.
Tiêu chuẩn canxi tốt: Công nghệ sinh học cao, Thuần thiên nhiên, Hàm lượng canxi cao, Hấp thu cao, An toàn không tác dụng phụ.
CANXI DÀNH CHO TRẺ EM TIENS: Thành phần chính: Bột canxi xương thủy phân enzym, VA, VD, VC, taurine, kẽm (zinc lactate), sắt (ferrous lactate). Chức năng sức khỏe: Bổ sung canxi. Hàm lượng: Hơn 3600mg canxi trên 100g. Đối tượng sử dụng: Thiếu niên nhi đồng cần bổ sung canxi.
Bột canxi thủy phân bằng enzym: Thủy phân enzym sinh học công nghệ cao, Nguồn canxi chất lượng cao tự nhiên và an toàn, an toàn khi ăn uống không gây kích ứng. Nguồn dinh dưỡng toàn diện, hàm lượng canxi cao, dễ hòa tan, dễ hấp thu. Nhiều loại khoáng chất cần thiết, nó là một phức hợp dinh dưỡng. Giàu axit amin, collagen peptide và collagen, giúp thúc đẩy sự hấp thụ canxi.
Hệ xương khỏe mạnh mới phát triển tốt chiều cao: Tỷ lệ canxi photpho Hài hòa. Taurine phát triển trí thông minh. Vitamin A + kẽm Thị lực tốt. Vitamin C + sắt Miễn dịch khỏe.
Cách dùng: Ngày 1-2 lần, mỗi lần 1 gói. Pha với nước ấm 60-70°C, hoặc trộn vào đồ ăn để ăn.
`;

// Fix: Use `process.env.API_KEY` to access the API key as per the guidelines.
const ai = new GoogleGenAI({ apikey: import.meta.env.VITE_API_KEY });}
const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: { type: Type.STRING },
      options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      correctAnswerIndex: { type: Type.INTEGER },
      explanation: { type: Type.STRING },
    },
    required: ["question", "options", "correctAnswerIndex", "explanation"],
  }
};

export const generateQuizQuestions = async (difficulty: Difficulty): Promise<QuizQuestion[]> => {
    const prompt = `Dựa vào thông tin sau đây về sản phẩm Canxi cho trẻ em của Tiens, hãy tạo ra 5 câu hỏi trắc nghiệm vui và dễ thương bằng tiếng Việt, phù hợp cho phụ huynh. Các câu hỏi phải liên quan trực tiếp đến nội dung được cung cấp. Mức độ khó của câu hỏi nên là: ${difficulty}.
    - Dễ: Các câu hỏi trực tiếp, dễ nhớ.
    - Vừa: Các câu hỏi suy luận nhẹ hoặc kết hợp 1-2 thông tin.
    - Khó: Các câu hỏi đòi hỏi sự hiểu biết sâu hơn hoặc so sánh thông tin.
    
    Hãy đảm bảo có 4 lựa chọn cho mỗi câu hỏi và chỉ có một câu trả lời đúng. Cung cấp một lời giải thích ngắn gọn, thân thiện cho câu trả lời đúng.

    Thông tin sản phẩm:
    ${ocrText}
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            // Fix: The `contents` property for a single text prompt should be a string.
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });

        const jsonStr = response.text.trim();
        const questions = JSON.parse(jsonStr);
        return questions;

    } catch (error) {
        console.error("Error generating quiz questions:", error);
        if (error instanceof Error && error.message.includes("SAFETY")) {
             throw new Error("Không thể tạo câu hỏi do cài đặt an toàn. Vui lòng thử một chủ đề khác.");
        }
        throw error;
    }
};
