export interface TripImage {
    src: string;
    caption: string;
    width?: number;
    height?: number;
}

export interface Trip {
    id: string;
    title: string;
    year: string;
    location: string;
    country: string;
    coverImage: string;
    coverImagePosition?: string;
    description: string;
    story: string;
    images: TripImage[];
    themeColor: string;
}

export const trips: Trip[] = [
    {
        id: "ninh-binh-2026",
        title: "Cố đô Ninh Bình",
        year: "2026",
        location: "Ninh Binh",
        country: "Vietnam",
        coverImage: "/images/backgroundninhbinh.jpg",
        coverImagePosition: "center 80%",
        description: "Vùng đất cố đô huyền thoại giữa núi non và sông nước.",
        story: "Ninh Bình hiện ra như một bức tranh thủy mặc khổng lồ mà tạo hóa đã dày công chạm khắc qua hàng triệu năm. Những ngọn núi đá vôi sừng sững vươn lên giữa đồng bằng xanh mướt, phản chiếu bóng mình xuống dòng sông Ngô Đồng lặng lờ.\n\nChèo thuyền qua Tràng An, mình lặng người trước vẻ đẹp hoang sơ của những hang động kỳ bí. Rời bến đò, bước chân đưa mình đến với chùa Bái Đính uy nghi, thành kính chiêm bái và tìm thấy sự thanh tịnh trong tâm hồn giữa không gian rộng lớn của Phật giáo.\n\nKhi hoàng hôn dần buông, phố cổ Hoa Lư lên đèn rực rỡ như đưa ta xuyên không về ngàn năm trước. Ninh Bình không chỉ đẹp, Ninh Bình còn có chiều sâu văn hóa giúp chữa lành tâm hồn.",
        images: [
            { src: "/images/ninhbinhtrip/nghethuat.jpg", caption: "Thưởng thức nghệ thuật đương đại" },
            { src: "/images/ninhbinhtrip/tuongphat.jpg", caption: "Tâm hướng phật" },
            { src: "/images/ninhbinhtrip/saulung.jpg", caption: "Không thấy mặt đẹp zai hẳn" },
            { src: "/images/ninhbinhtrip/chuathay.jpg", caption: "Địa Tạng Phi Lai Tự" },
            { src: "/images/ninhbinhtrip/hanhlang.jpg", caption: "Sân chùa đầy nắng và gió" },
            { src: "/images/ninhbinhtrip/caykho.jpg", caption: "Bình yên" },
            { src: "/images/ninhbinhtrip/trannha.jpg", caption: "Toàn vàng là vàng" },
            { src: "/images/ninhbinhtrip/thapbut.jpg", caption: "Tháp Bút" },
            { src: "/images/ninhbinhtrip/tuongvang.jpg", caption: "Kiến trúc mê đét" },
        ],
        themeColor: "#5C7A4E", // Forest Green
    },
    {
        id: "ha-giang-2025",
        title: "Núi Rừng Hà Giang",
        year: "2025",
        location: "Ha Giang",
        country: "Vietnam",
        coverImage: "/images/backgroundhagiang.jpg", // Ha Giang mountains
        description: "Chinh phục những cung đường đá tai mèo hùng vĩ.",
        story: "Hà Giang mùa này đẹp đến nao lòng. Cái lạnh se sắt của vùng cao nguyên đá, những triền hoa tam giác mạch hồng phớt trải dài ngút ngàn.\n\nĐứng trên đỉnh Mã Pí Lèng, nhìn dòng sông Nho Quế xanh ngắt như một dải lụa vắt ngang trời, mình cảm thấy con người thật nhỏ bé trước thiên nhiên hùng vĩ. Mỗi khúc cua tay áo là một thử thách, nhưng cũng là một món quà cho những ai dám đi.\n\nĐêm xuống rảo bước trong bản Lô Lô Chải soi bóng dưới rặng cột cờ Lũng Cú, ngồi bên bếp lửa hồng, nhâm nhi chút rượu ngô, xuýt xoa với lẩu gà đen xua đi cái rét vùng cao... Đó là những ký ức nhịp sống chậm rãi, bình yên không thể nào quên.",
        images: [
            { src: "/images/hagiangtrip/docthamma.jpg", caption: "Dốc Thẩm Mã" },
            { src: "/images/hagiangtrip/baduatre.jpg", caption: "Các em nhỏ dân tộc" },
            { src: "/images/hagiangtrip/rungthong.jpg", caption: "Rừng thông Yên Minh" },
            { src: "/images/hagiangtrip/mapileng.jpg", caption: "Đèo Mã Pí Lèng" },
            { src: "/images/hagiangtrip/caonguyenda.jpg", caption: "Cao nguyên đá Đồng Văn" },
            { src: "/images/hagiangtrip/momdatuthan.jpg", caption: "Mỏm đá Tử Thần" },
            { src: "/images/hagiangtrip/hoadao.jpg", caption: "Mai anh đào" },
            { src: "/images/hagiangtrip/lolochai.jpg", caption: "Làng Lô Lô Chải" },
            { src: "/images/hagiangtrip/bandemtailolochai.jpg", caption: "Làng Lô Lô Chải ban đêm" },
            { src: "/images/hagiangtrip/phocao.jpg", caption: "Phố Cáo" },
            { src: "/images/hagiangtrip/somewherelolochai.jpg", caption: "Somewhere in Lô Lô Chải" },
            { src: "/images/hagiangtrip/cotcolungcu.jpg", caption: "View cột cờ Lũng Cú" },
        ],
        themeColor: "#4A5D23", // Moss Green
    },
    {
        id: "co-to-2025",
        title: "Đảo Ngọc Cô Tô",
        year: "2025",
        location: "Co To",
        country: "Vietnam",
        coverImage: "/images/backgroundcoto.jpg", // TODO: Add cover image
        description: "Biển xanh, cát trắng và nắng vàng của đảo ngọc Cô Tô.",
        story: "Cô Tô chào đón bằng những bãi biển trong vắt và cát trắng mịn trải dài. Tiếng sóng vỗ rì rào như một bản tình ca của đại dương, xua tan mọi mệt mỏi của cuộc sống phố thị.\n\nĐạp xe dạo quanh đảo, đón bình minh ở bãi đá Cầu Mỵ, hay ngắm hoàng hôn buông xuống trên ngọn hải đăng... Mỗi khoảnh khắc ở Cô Tô đều là những trải nghiệm tuyệt vời.\n\nThưởng thức hải sản tươi ngon bên bờ biển, lắng nghe tiếng gió biển thổi qua những rặng phi lao, cảm nhận sự an yên và tự do giữa biển trời bao la.",
        images: [
            { src: "/images/cototrip/linhthuydanhbac.jpg", caption: "Lính thủy đánh bạc" },
            { src: "/images/cototrip/cosong.jpg", caption: "Lúc này sóng to quá" },
            { src: "/images/cototrip/quietpeople.jpg", caption: "Quiet people" },
            { src: "/images/cototrip/langchai.jpg", caption: "Làng chài nhỏ" },
            { src: "/images/cototrip/viewcano.jpg", caption: "View từ cano" },
            { src: "/images/cototrip/caycodon.jpg", caption: "Cây cô đơn" },
            { src: "/images/cototrip/traidatnaylacuabomay.jpg", caption: "Trái đất này là của bố mày" },
            { src: "/images/cototrip/nghichngom.jpg", caption: "Nghịch nước tí" },
            { src: "/images/cototrip/khongthaymat.jpg", caption: "Không thấy mặt đẹp try hẳn" },
            { src: "/images/cototrip/nuoctrongveo.jpg", caption: "Nước trong veo" },
            { src: "/images/cototrip/bienxanhcattrang.jpg", caption: "Biển xanh cát trắng" },
            { src: "/images/cototrip/songhoito.jpg", caption: "Bãi đá no name" },
            { src: "/images/cototrip/batcongdem.jpg", caption: "Tour bắt còng đêm" },
            { src: "/images/cototrip/haisan.jpg", caption: "Hải sản đảo" },
            { src: "/images/cototrip/hoinhieuchat.jpg", caption: "Hơi nhiều chất" },
        ],
        themeColor: "#006994", // Sea Blue
    },
    {
        id: "cao-bang-2024",
        title: "Non Nước Cao Bằng",
        year: "2024",
        location: "Cao Bang",
        country: "Vietnam",
        coverImage: "/images/backgroundthacbangioc.jpg", // Ban Gioc waterfall
        description: "Bản tình ca của thác và núi.",
        story: "Cao Bằng chào đón mình bằng tiếng thác đổ ầm ầm của Bản Giốc. Dòng thác trắng xóa đổ xuống giữa màu xanh bạt ngàn của rừng núi biên cương, đẹp tựa chốn bồng lai tiên cảnh.\n\nSáng sớm thức dậy ở homestay, mây mù giăng kín lối đi. Không khí trong lành đến mức bạn muốn hít căng lồng ngực để mang chút hương vị núi rừng về thành phố.\n\nĐộng Ngườm Ngao với những thạch nhũ lung linh huyền ảo, suối Lê-nin trong vắt nhìn thấy đáy... Tất cả tạo nên một bức tranh thủy mặc hữu tình.",
        images: [
            { src: "/images/caobangtrip/backgroundthacbangioc.jpg", caption: "Thác Bản Giốc nhìn từ xa" },
            { src: "/images/caobangtrip/thuyhu.jpg", caption: "Làm tí võ vẽ" },
            { src: "/images/caobangtrip/thacbangioc.jpg", caption: "Vẫn là thác Bản Giốc" },
            { src: "/images/caobangtrip/hothanghen.jpg", caption: "Hồ Thang Hen" },
            { src: "/images/caobangtrip/meditation.jpg", caption: "Tâm phải tĩnh" },
            { src: "/images/caobangtrip/suoilenin.jpg", caption: "Suối Lê Nin" },
            { src: "/images/caobangtrip/vongquaythoigian.jpg", caption: "Vòng quay thời gian" },
            { src: "/images/caobangtrip/ngamchan.jpg", caption: "Ta dại ta tìm nơi vắng vẻ" },
            { src: "/images/caobangtrip/vanlasuoilenin.jpg", caption: "Cây cổ thụ" },
        ],
        themeColor: "#008080", // Teal
    },
    {
        id: "da-lat-2024",
        title: "Thành Phố Sương Mù",
        year: "2024",
        location: "Da Lat",
        country: "Vietnam",
        coverImage: "/images/backgrounddalat.jpg", // Da Lat pine forest/mist vibe
        coverImagePosition: "center 60%",
        description: "Nơi thời gian trôi chậm lại.",
        story: "Đà Lạt không chỉ có lạnh, Đà Lạt còn có tình. Những buổi sáng thức dậy trong màn sương dày đặc, cầm ly cà phê nóng trên tay, nhìn ra đồi thông chập chùng.\n\nMùa này dã quỳ nở vàng rực cả một góc trời. Mình chạy xe máy len lỏi qua những con dốc nhỏ, hít hà mùi thông ngai ngái. Không ồn ào, không vội vã, Đà Lạt dịu dàng ôm lấy những tâm hồn đang cần được chữa lành.\n\nBuổi tối dạo quanh hồ Xuân Hương, ghé chợ đêm ăn bánh tráng nướng, uống sữa đậu nành... Những điều giản dị mà bình yên đến lạ.",
        images: [
            { src: "/images/dalattrip/nuidoichapchung.jpg", caption: "Núi đồi chập chùng" },
            { src: "/images/dalattrip/chilling.jpg", caption: "Chilling hồ Tuyền Lâm" },
            { src: "/images/dalattrip/stylehoixuan.jpg", caption: "Hồi xuân" },
            { src: "/images/dalattrip/cfnhohoai.jpg", caption: "Tiệm cà phê Nhớ Hoài" },
            { src: "/images/dalattrip/vungkyuc.jpg", caption: "Vùng ký ước" },
            { src: "/images/dalattrip/tiemmaynhohoai.jpg", caption: "Hoài niệm" },
            { src: "/images/dalattrip/trekking.jpg", caption: "Top 5 Trekking 5.5km" },
            { src: "/images/dalattrip/chetuoi.jpg", caption: "Chè tươi" },
            { src: "/images/dalattrip/vuavenhi.jpg", caption: "Vua về nhì" },
            { src: "/images/dalattrip/musicshow.jpg", caption: "Nashtech music show" },
            { src: "/images/dalattrip/nightview.jpg", caption: "Night view" },
            { src: "/images/dalattrip/buatoivuive.jpg", caption: "Bữa tối vui vẻ" },

        ],
        themeColor: "#B57EDC", // Lavender
    },
];
