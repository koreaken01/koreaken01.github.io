/**
 * 산지경매사 모의 프로그램 - 메인 애플리케이션
 * 시뮬레이션 로직 및 게임 상태 관리
 */

class AuctionSimulator {
    constructor() {
        this.dataManager = new DataManager();
        this.uiManager = new UIManager();
        
        // 게임 상태
        this.electronicCount = 0;
        this.manualCount = 0;
        this.currentQuestion = 1;
        this.currentElectronicQuestion = 1;
        this.currentManualQuestion = 1;
        this.totalQuestions = 0;
        this.currentMode = 'electronic';
        this.timer = null;
        this.timeLeft = 15;
        this.imageInterval = null;
        this.currentImageIndex = 0;
        this.currentItem = null;
        this.usedItems = [];
        this.bidCount = 0;
        this.passCount = 0;
        
        this.initialize();
    }

    /**
     * 초기화
     */
    async initialize() {
        // 데이터 로드
        await this.dataManager.loadFishData();
        if (this.dataManager.fishItems.length === 0) {
            this.dataManager.loadDefaultData();
        }
        
        // 이벤트 리스너 설정
        this.setupEventListeners();
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        // 키보드 이벤트
        document.addEventListener('keydown', (e) => {
            if (this.uiManager.elements.mainScreen.style.display === 'flex') {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleBid();
                } else if (e.key === 'F12') {
                    e.preventDefault();
                    this.handlePass();
                }
            }
        });
    }

    /**
     * 시뮬레이션 시작
     */
    startSimulation() {
        this.electronicCount = parseInt(this.uiManager.elements.electronicCount.value);
        this.manualCount = parseInt(this.uiManager.elements.manualCount.value);
        this.totalQuestions = this.electronicCount + this.manualCount;
        
        this.uiManager.showMainScreen();
        this.startNewQuestion();
    }

    /**
     * 새 문제 시작
     */
    startNewQuestion() {
        // 모든 문제 완료 체크
        if (this.currentQuestion > this.totalQuestions) {
            this.showResults();
            return;
        }

        // 모드 결정 - 전자식 먼저, 수지식 나중에
        if (this.currentQuestion <= this.electronicCount) {
            this.currentMode = 'electronic';
        } else {
            this.currentMode = 'manual';
        }

        // 랜덤 품목 선택
        this.currentItem = this.dataManager.getRandomItem(this.usedItems);
        this.usedItems.push(this.currentItem.name);

        // UI 업데이트
        this.updateUI();
        
        // 타이머와 이미지 슬라이드 즉시 시작
        this.startTimer();
        this.startImageSlideshow();
    }

    /**
     * UI 업데이트
     */
    updateUI() {
        // 문제 번호 및 모드 업데이트
        const questionNumber = this.currentMode === 'electronic' ? 
            this.currentElectronicQuestion : this.currentManualQuestion;
        this.uiManager.updateQuestionInfo(questionNumber, this.currentMode);
        
        // 랜덤 정보 생성 및 표시
        const randomInfo = this.dataManager.generateRandomInfo();
        this.uiManager.displayRandomInfo(randomInfo);
        
        // 모드별 설정
        if (this.currentMode === 'electronic') {
            // 전자식: 응찰 테이블 표시
            const bids = this.dataManager.generateElectronicBids(randomInfo.price);
            this.uiManager.setupElectronicTable(bids);
        } else {
            // 수지식: 손가락 이미지 표시
            const fingerImages = [];
            for (let i = 0; i < 5; i++) {
                fingerImages.push(this.dataManager.getRandomFingerImage());
            }
            this.uiManager.setupFingerDisplay(fingerImages);
        }
    }

    /**
     * 이미지 슬라이드쇼
     */
    startImageSlideshow() {
        clearInterval(this.imageInterval);
        this.currentImageIndex = 0;
        
        if (this.currentItem && this.currentItem.images.length > 0) {
            this.uiManager.updateProductImage(this.currentItem.images[0]);
            
            this.imageInterval = setInterval(() => {
                this.currentImageIndex = (this.currentImageIndex + 1) % this.currentItem.images.length;
                this.uiManager.updateProductImage(this.currentItem.images[this.currentImageIndex]);
            }, 2500);
        }
    }

    /**
     * 타이머 시작
     */
    startTimer() {
        clearInterval(this.timer);
        this.timeLeft = 15;
        this.uiManager.updateTimer(this.timeLeft);
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.uiManager.updateTimer(this.timeLeft);
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.nextQuestion();
            }
        }, 1000);
    }

    /**
     * 낙찰 처리
     */
    handleBid() {
        if (this.uiManager.elements.mainScreen.style.display === 'flex' && this.timeLeft > 0) {
            this.bidCount++;
            clearInterval(this.timer);
            clearInterval(this.imageInterval);
            this.showAnswerAndProceed();
        }
    }

    /**
     * 유찰 처리
     */
    handlePass() {
        if (this.uiManager.elements.mainScreen.style.display === 'flex' && this.timeLeft > 0) {
            this.passCount++;
            clearInterval(this.timer);
            clearInterval(this.imageInterval);
            this.showAnswerAndProceed();
        }
    }

    /**
     * 정답 보여주고 다음 문제로
     */
    showAnswerAndProceed() {
        this.uiManager.showItemModal(this.currentItem, () => {
            this.currentQuestion++;
            if (this.currentMode === 'electronic') {
                this.currentElectronicQuestion++;
            } else {
                this.currentManualQuestion++;
            }
            this.startNewQuestion();
        });
    }

    /**
     * 다음 문제 (타이머 종료시)
     */
    nextQuestion() {
        this.showAnswerAndProceed();
    }

    /**
     * 결과 표시
     */
    showResults() {
        clearInterval(this.timer);
        clearInterval(this.imageInterval);
        
        this.uiManager.showResultScreen();
        this.uiManager.updateResults(
            this.electronicCount,
            this.manualCount,
            this.totalQuestions,
            this.bidCount,
            this.passCount
        );
    }
}

// 전역 인스턴스 및 함수
let simulator;

// DOM 로드 완료시 초기화
window.addEventListener('DOMContentLoaded', async () => {
    simulator = new AuctionSimulator();
});

// HTML에서 호출하는 전역 함수들
window.startSimulation = function() {
    if (simulator) {
        simulator.startSimulation();
    }
};

window.handleBid = function() {
    if (simulator) {
        simulator.handleBid();
    }
};

window.handlePass = function() {
    if (simulator) {
        simulator.handlePass();
    }
};
