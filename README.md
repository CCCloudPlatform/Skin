#CLCL CloudPlatform Skin Component

## 프로젝트 개요

CLCL CloudPlatform Skin Component는 IaaS(Infrastructure as a Service)를 제공하는 플랫폼 위에서 PaaS(Platform as a Service)를 구현하기 위한 오픈소스 프로젝트의 일부입니다. 이 컴포넌트는 사용자 친화적인 Web UI 서비스를 제공하여 PaaS 환경의 관리와 운영을 용이하게 합니다.

주요 특징:
- React 기반의 모던하고 반응형 웹 인터페이스
- IaaS 플랫폼과의 원활한 통합
- PaaS 기능을 위한 직관적인 사용자 경험 제공
- 확장 가능하고 커스터마이징 가능한 UI 컴포넌트

이 프로젝트는 클라우드 서비스 제공자와 개발자들이 손쉽게 PaaS 환경을 구축하고 관리할 수 있도록 돕는 것을 목표로 합니다. CLCL CloudPlatform Skin Component를 통해 사용자들은 복잡한 인프라 관리에서 벗어나 애플리케이션 개발과 배포에 더 집중할 수 있습니다.

#개발 환경 

## Docker Compose 실행 방법

1. Docker가 설치되어 있는지 확인합니다.

2. 프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다:

   ```
   docker-compose up
   ```

3. 빌드가 완료되면 브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

4. 개발을 마치고 컨테이너를 종료하려면, 다른 터미널 창에서 다음 명령어를 실행합니다:

   ```
   docker-compose down
   ```

주의: 첫 실행 시 Node.js 패키지 설치로 인해 시간이 다소 소요될 수 있습니다.


## 변경사항 적용 방법

1. 코드를 수정한 후, 변경사항을 저장합니다.

2. 만약 새로운 npm 패키지를 설치했다면, Docker 컨테이너를 재시작해야 합니다. 다음 명령어를 사용하여 컨테이너를 중지하고 다시 시작합니다:

   ```
   docker-compose down
   docker-compose up
   ```

3. npm 패키지 변경이 없는 경우, React의 핫 리로딩 기능으로 인해 대부분의 변경사항은 자동으로 적용됩니다. 브라우저에서 변경사항을 확인할 수 있습니다.

4. 자동으로 변경사항이 적용되지 않는 경우, 브라우저에서 페이지를 새로고침하거나 애플리케이션을 재시작해보세요.

5. 환경 변수나 Docker 설정을 변경한 경우, 컨테이너를 재빌드해야 할 수 있습니다. 이 경우 다음 명령어를 사용합니다:

   ```
   docker-compose up --build
   ```

주의: 변경사항을 적용한 후에도 문제가 지속되면, 로그를 확인하여 오류를 파악하고 필요한 조치를 취하세요.

