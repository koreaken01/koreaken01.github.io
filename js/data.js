/**
 * 산지경매사 교육용 프로그램 - 데이터 모듈
 * CSV 파일 로드 및 품목 데이터 관리
 */

class DataManager {
    constructor() {
        this.fishItems = [];
        this.fingerImages = [
            'finger_1.png', 'finger_2.png', 'finger_3.png',
            'finger_4.png', 'finger_5.png', 'finger_6.png',
            'finger_7.png', 'finger_8.png', 'finger_9.png'
        ];
        
        // GitHub Pages에서 안정적인 경로 처리를 위한 base URL 설정
        this.baseUrl = this.getBaseUrl();
    }
    
    /**
     * 현재 페이지의 base URL을 가져오는 함수
     */
    getBaseUrl() {
        // GitHub Pages의 경우 repository name이 URL에 포함될 수 있음
        const pathSegments = window.location.pathname.split('/');
        if (pathSegments.length > 1 && pathSegments[1] !== '') {
            // repository name이 있는 경우
            return '/' + pathSegments[1] + '/';
        }
        return './';
    }

    /**
     * CSV 데이터를 파싱하여 fishItems 배열 생성
     */
    async loadFishData() {
        try {
            const csvUrl = this.baseUrl + 'img/seafood_images.csv';
            console.log('CSV 파일 로드 시도:', csvUrl);
            const response = await fetch(csvUrl);
            const csvText = await response.text();
            const lines = csvText.split('\n');
            
            // 헤더 스킵하고 데이터 파싱
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    // CSV 파싱 (간단한 방법)
                    const parts = lines[i].split(',');
                    if (parts.length >= 3) {
                        // 이미지 배열 생성 (빈 값 제거)
                        const images = [];
                        for (let j = 2; j < parts.length && j < 7; j++) {
                            if (parts[j] && parts[j].trim()) {
                                // 이미지 경로 정규화
                                let imagePath = parts[j].trim();
                                if (!imagePath.startsWith('./') && !imagePath.startsWith('/') && !imagePath.startsWith('http')) {
                                    imagePath = this.baseUrl + imagePath;
                                } else if (imagePath.startsWith('./')) {
                                    imagePath = this.baseUrl + imagePath.substring(2);
                                }
                                images.push(imagePath);
                            }
                        }
                        
                        // 이미지가 하나라도 있으면 추가
                        if (images.length > 0) {
                            const item = {
                                name: parts[0].trim(),
                                scientific: parts[1].trim(),
                                images: images
                            };
                            this.fishItems.push(item);
                        }
                    }
                }
            }
            console.log(`${this.fishItems.length}개 품목 로드 완료`);
            console.log('Base URL:', this.baseUrl);
        } catch (error) {
            console.error('CSV 로드 실패:', error);
            console.log('Base URL:', this.baseUrl);
            // 기본 데이터 사용
            this.loadDefaultData();
        }
    }

    /**
     * CSV 로드 실패시 사용할 기본 데이터
     */
    loadDefaultData() {
        this.fishItems = [
            { 
                name: "갈치", 
                scientific: "Trichiurus lepturus", 
                images: [
                    this.baseUrl + "img/seafood/1_갈치_1.jpg",
                    this.baseUrl + "img/seafood/1_갈치_2.jpg",
                    this.baseUrl + "img/seafood/1_갈치_3.jpg",
                    this.baseUrl + "img/seafood/1_갈치_4.jpg",
                    this.baseUrl + "img/seafood/1_갈치_5.png"
                ]
            },
            { 
                name: "고등어", 
                scientific: "Scomber japonicus", 
                images: [
                    this.baseUrl + "img/seafood/3_고등어.png",
                    this.baseUrl + "img/seafood/3_갈고등어.png",
                    this.baseUrl + "img/seafood/3_망치고등어.png",
                    this.baseUrl + "img/seafood/3_줄무늬고등어.png"
                ]
            },
            { 
                name: "꽁치", 
                scientific: "Cololabis saira", 
                images: [
                    this.baseUrl + "img/seafood/4_꽁치_1.png",
                    this.baseUrl + "img/seafood/4_꽁치_2.jpg"
                ]
            },
            { 
                name: "넙치", 
                scientific: "Paralichthys olivaceus", 
                images: [
                    this.baseUrl + "img/seafood/5_마찰넙치.png",
                    this.baseUrl + "img/seafood/5_별넙치.png",
                    this.baseUrl + "img/seafood/5_사량넙치.png",
                    this.baseUrl + "img/seafood/5_점넙치.png",
                    this.baseUrl + "img/seafood/5_풀넙치.png"
                ]
            },
            { 
                name: "농어", 
                scientific: "Lateolabrax japonicus", 
                images: [
                    this.baseUrl + "img/seafood/6_농어.png",
                    this.baseUrl + "img/seafood/6_점농어.png"
                ]
            },
            { 
                name: "멸치", 
                scientific: "Engraulis japonicus", 
                images: [
                    this.baseUrl + "img/seafood/12_멸치.jpeg"
                ]
            },
            { 
                name: "참돔", 
                scientific: "Pagrus major", 
                images: [
                    this.baseUrl + "img/seafood/35_참돔.jpeg"
                ]
            },
            { 
                name: "꽃게", 
                scientific: "Portunus trituberculatus", 
                images: [
                    this.baseUrl + "img/seafood/44_꽃게.jpeg"
                ]
            },
            { 
                name: "대게", 
                scientific: "Chionoecetes opilio", 
                images: [
                    this.baseUrl + "img/seafood/45_대게.jpeg"
                ]
            }
        ];
        console.log('기본 데이터 로드 완료');
    }

    /**
     * 랜덤 품목 선택
     */
    getRandomItem(usedItems) {
        let availableItems = this.fishItems.filter(item => !usedItems.includes(item.name));
        if (availableItems.length === 0) {
            availableItems = this.fishItems;
        }
        return availableItems[Math.floor(Math.random() * availableItems.length)];
    }

    /**
     * 랜덤 정보 생성
     */
    generateRandomInfo() {
        const areas = ['전남 해남', '부산 감천', '통영', '여수', '포항', '속초', '울산', '거제'];
        const shippers = ['권 우 준', '박 수 홍', '김 철 수', '이 영 희', '최 민 수', '정 대 호'];
        const grades = ['A++', 'A+', 'A', 'B++', 'B+', 'B'];
        const units = ['3kg', '5kg', '10kg', '1Box', '3Box', '5Box'];
        const quantities = ['1', '3', '5', '10', '15', '20'];
        
        const selectedUnit = units[Math.floor(Math.random() * units.length)];
        const basePrice = Math.floor(Math.random() * 150000) + 30000;
        const price = Math.floor(basePrice / 5000) * 5000;
        
        return {
            productionArea: areas[Math.floor(Math.random() * areas.length)],
            shipper: shippers[Math.floor(Math.random() * shippers.length)],
            grade: grades[Math.floor(Math.random() * grades.length)],
            unit: selectedUnit,
            quantity: quantities[Math.floor(Math.random() * quantities.length)] + 
                (selectedUnit.includes('Box') ? '만' : 'kg'),
            price: price
        };
    }

    /**
     * 전자식 경매 응찰 데이터 생성
     * @param {number} reservePrice - 내정가
     * @returns {Array} 응찰자 목록
     */
    generateElectronicBids(reservePrice) {
        // 중도매인 번호 풀 (실제 경매처럼 다양한 번호 사용)
        const bidderNumbers = [5, 11, 15, 17, 19, 25, 29, 31];
        
        // 5개의 랜덤 중도매인 번호 선택
        const selectedBidders = [];
        const shuffled = [...bidderNumbers].sort(() => Math.random() - 0.5);
        for (let i = 0; i < 5; i++) {
            selectedBidders.push(shuffled[i]);
        }
        
        // 응찰 패턴 결정 (0: 모두 낮음, 1: 일부 높음, 2: 모두 높음)
        const pattern = Math.random();
        let bids = [];
        
        if (pattern < 0.33) {
            // 패턴 1: 모든 응찰가가 내정가보다 낮음 (유찰 상황)
            for (let i = 0; i < 5; i++) {
                const discount = Math.random() * 0.3 + 0.1; // 10%~40% 할인
                const bidPrice = Math.floor(reservePrice * (1 - discount) / 1000) * 1000;
                bids.push({
                    number: selectedBidders[i],
                    price: bidPrice
                });
            }
        } else if (pattern < 0.67) {
            // 패턴 2: 일부만 내정가보다 높음 (경쟁 상황)
            const higherCount = Math.floor(Math.random() * 3) + 1; // 1~3개가 높음
            for (let i = 0; i < 5; i++) {
                let bidPrice;
                if (i < higherCount) {
                    // 내정가보다 높게
                    const premium = Math.random() * 0.2 + 0.02; // 2%~22% 프리미엄
                    bidPrice = Math.floor(reservePrice * (1 + premium) / 1000) * 1000;
                } else {
                    // 내정가보다 낮게
                    const discount = Math.random() * 0.2 + 0.05; // 5%~25% 할인
                    bidPrice = Math.floor(reservePrice * (1 - discount) / 1000) * 1000;
                }
                bids.push({
                    number: selectedBidders[i],
                    price: bidPrice
                });
            }
        } else {
            // 패턴 3: 모든 응찰가가 내정가보다 높음 (과열 경쟁)
            for (let i = 0; i < 5; i++) {
                const premium = Math.random() * 0.25 + 0.05; // 5%~30% 프리미엄
                const bidPrice = Math.floor(reservePrice * (1 + premium) / 1000) * 1000;
                bids.push({
                    number: selectedBidders[i],
                    price: bidPrice
                });
            }
        }
        
        // 가격순으로 정렬 (높은 가격이 위로)
        bids.sort((a, b) => b.price - a.price);
        
        return bids;
    }

    /**
     * 손가락 이미지 랜덤 선택
     */
    getRandomFingerImage() {
        return this.fingerImages[Math.floor(Math.random() * this.fingerImages.length)];
    }
}

// Export for use in other modules
window.DataManager = DataManager;
