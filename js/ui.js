/**
 * 산지경매사 모의 프로그램 - UI 컴포넌트 모듈
 * UI 업데이트 및 DOM 조작 관리
 */

class UIManager {
    constructor() {
        this.elements = this.initializeElements();
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
     * DOM 요소 초기화
     */
    initializeElements() {
        return {
            // Screens
            setupScreen: document.getElementById('setupScreen'),
            mainScreen: document.getElementById('mainScreen'),
            resultScreen: document.getElementById('resultScreen'),
            
            // Input fields
            electronicCount: document.getElementById('electronicCount'),
            manualCount: document.getElementById('manualCount'),
            
            // Display elements
            timer: document.getElementById('timer'),
            userInfo: document.getElementById('userInfo'),
            questionNumber: document.getElementById('questionNumber'),
            productLabel: document.getElementById('productLabel'),
            productImage: document.getElementById('productImage'),
            
            // Info table
            modeDisplay: document.getElementById('modeDisplay'),
            productionArea: document.getElementById('productionArea'),
            shipper: document.getElementById('shipper'),
            itemName: document.getElementById('itemName'),
            grade: document.getElementById('grade'),
            unit: document.getElementById('unit'),
            quantity: document.getElementById('quantity'),
            bidPrice: document.getElementById('bidPrice'),
            
            // Mode sections
            fingerSection: document.getElementById('fingerSection'),
            fingerGrid: document.getElementById('fingerGrid'),
            manualSection: document.getElementById('manualSection'),
            manualTableBody: document.getElementById('manualTableBody'),
            
            // Modal
            itemModal: document.getElementById('itemModal'),
            modalItemName: document.getElementById('modalItemName'),
            modalScientificName: document.getElementById('modalScientificName'),
            
            // Results
            resultElectronic: document.getElementById('resultElectronic'),
            resultManual: document.getElementById('resultManual'),
            resultTotal: document.getElementById('resultTotal'),
            resultBid: document.getElementById('resultBid'),
            resultPass: document.getElementById('resultPass')
        };
    }

    /**
     * 화면 전환
     */
    showSetupScreen() {
        this.elements.setupScreen.style.display = 'block';
        this.elements.mainScreen.style.display = 'none';
        this.elements.resultScreen.style.display = 'none';
    }

    showMainScreen() {
        this.elements.setupScreen.style.display = 'none';
        this.elements.mainScreen.style.display = 'flex';
        this.elements.resultScreen.style.display = 'none';
    }

    showResultScreen() {
        this.elements.setupScreen.style.display = 'none';
        this.elements.mainScreen.style.display = 'none';
        this.elements.resultScreen.style.display = 'block';
    }

    /**
     * 타이머 업데이트
     */
    updateTimer(timeLeft) {
        this.elements.timer.textContent = timeLeft;
        
        if (timeLeft <= 5) {
            this.elements.timer.classList.add('warning');
        } else {
            this.elements.timer.classList.remove('warning');
        }
    }

    /**
     * 문제 정보 업데이트
     */
    updateQuestionInfo(currentQuestion, mode) {
        this.elements.questionNumber.textContent = currentQuestion;
        
        if (mode === 'electronic') {
            this.elements.productLabel.innerHTML = `전자식 <span>${currentQuestion}</span>`;
            this.elements.fingerSection.style.display = 'none';
            this.elements.manualSection.style.display = 'block';
        } else {
            this.elements.productLabel.innerHTML = `수지식 <span>${currentQuestion}</span>`;
            this.elements.fingerSection.style.display = 'block';
            this.elements.manualSection.style.display = 'none';
        }
        
        // 품목 정보 빈칸으로 초기화
        this.elements.itemName.textContent = '';
    }

    /**
     * 랜덤 정보 표시
     */
    displayRandomInfo(info) {
        this.elements.productionArea.textContent = info.productionArea;
        this.elements.shipper.textContent = info.shipper;
        this.elements.grade.textContent = info.grade;
        this.elements.unit.textContent = info.unit;
        this.elements.quantity.textContent = info.quantity;
        this.elements.bidPrice.textContent = '₩' + info.price.toLocaleString();
    }

    /**
     * 손가락 표시 설정
     */
    setupFingerDisplay(fingerImages) {
        this.elements.fingerGrid.innerHTML = '';
        const numbers = [25, 31, 17, 19, 29];
        
        for (let i = 0; i < 5; i++) {
            const fingerBox = document.createElement('div');
            fingerBox.className = 'finger-box';
            
            const numberLabel = document.createElement('div');
            numberLabel.className = 'finger-number';
            numberLabel.textContent = numbers[i];
            
            const fingerImg = document.createElement('img');
            fingerImg.className = 'finger-image';
            // base URL을 동적으로 가져와서 사용
            const baseUrl = this.getBaseUrl();
            fingerImg.src = `${baseUrl}img/finger/${fingerImages[i]}`;
            fingerImg.alt = `손가락 ${i + 1}`;
            
            // 이미지 로드 실패시 대체 표시
            fingerImg.onerror = function() {
                console.warn('손가락 이미지 로드 실패:', this.src);
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.style.width = '50px';
                placeholder.style.height = '60px';
                placeholder.style.background = '#ddd';
                placeholder.style.borderRadius = '5px';
                placeholder.style.display = 'flex';
                placeholder.style.alignItems = 'center';
                placeholder.style.justifyContent = 'center';
                placeholder.style.fontSize = '12px';
                placeholder.style.fontWeight = 'bold';
                placeholder.textContent = i + 1;
                this.parentNode.appendChild(placeholder);
            };
            
            fingerBox.appendChild(numberLabel);
            fingerBox.appendChild(fingerImg);
            this.elements.fingerGrid.appendChild(fingerBox);
        }
    }

    /**
     * 전자식 테이블 설정
     * @param {Array} bids - 응찰 데이터 배열
     */
    setupElectronicTable(bids) {
        this.elements.manualTableBody.innerHTML = '';
        
        bids.forEach((bidder, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bidder.number}</td>
                <td>₩${bidder.price.toLocaleString()}</td>
            `;
            this.elements.manualTableBody.appendChild(row);
        });
    }

    /**
     * 품목 모달 표시
     */
    showItemModal(item, callback) {
        this.elements.modalItemName.textContent = item.name;
        this.elements.modalScientificName.textContent = item.scientific;
        this.elements.itemModal.classList.add('show');
        
        setTimeout(() => {
            this.elements.itemModal.classList.remove('show');
            if (callback) callback();
        }, 3000);
    }

    /**
     * 이미지 업데이트
     */
    updateProductImage(imageUrl) {
        const img = this.elements.productImage;
        
        // 이미지 로드 성공시
        img.onload = function() {
            this.style.display = 'block';
        };
        
        // 이미지 로드 실패시
        img.onerror = function() {
            console.warn('이미지 로드 실패:', imageUrl);
            this.style.display = 'none';
            // 대체 텍스트 표시
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '300px';
            placeholder.style.background = '#f0f0f0';
            placeholder.style.border = '2px dashed #ccc';
            placeholder.style.borderRadius = '10px';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.fontSize = '18px';
            placeholder.style.color = '#666';
            placeholder.textContent = '이미지를 불러올 수 없습니다';
            
            // 기존 placeholder 제거
            const existingPlaceholder = this.parentNode.querySelector('.image-placeholder');
            if (existingPlaceholder) {
                existingPlaceholder.remove();
            }
            
            placeholder.className = 'image-placeholder';
            this.parentNode.appendChild(placeholder);
        };
        
        img.src = imageUrl;
    }

    /**
     * 결과 화면 업데이트
     */
    updateResults(electronicCount, manualCount, totalQuestions, bidCount, passCount) {
        this.elements.resultElectronic.textContent = electronicCount + '문제';
        this.elements.resultManual.textContent = manualCount + '문제';
        this.elements.resultTotal.textContent = totalQuestions + '문제';
        this.elements.resultBid.textContent = bidCount + '건';
        this.elements.resultPass.textContent = passCount + '건';
    }
}

// Export for use in other modules
window.UIManager = UIManager;
