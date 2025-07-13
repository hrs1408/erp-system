const fs = require('fs');
const path = require('path');

// Danh sách các micro-frontends cần sửa
const micros = [
  { name: 'hr', component: 'HrComponent', module: 'HRModule' },
  { name: 'finance', component: 'FinanceComponent', module: 'FinanceModule' },
  { name: 'reports', component: 'ReportsComponent', module: 'ReportsModule' }
];

micros.forEach(micro => {
  const modulePath = `micro-frontends/${micro.name}/src/app/${micro.name}/${micro.name}.module.ts`;
  const componentPath = `micro-frontends/${micro.name}/src/app/${micro.name}/${micro.name}.component.ts`;
  
  // Đọc file module
  let moduleContent = fs.readFileSync(modulePath, 'utf8');
  
  // Thêm import component
  moduleContent = moduleContent.replace(
    `// ${micro.component} is now standalone`,
    `import { ${micro.component} } from './${micro.name}.component';`
  );
  
  // Sửa routes
  moduleContent = moduleContent.replace(
    `loadComponent: () => import('./${micro.name}.component').then(m => m.${micro.component})`,
    `component: ${micro.component}`
  );
  
  // Thêm component vào declarations
  const declarationsMatch = moduleContent.match(/declarations:\s*\[([\s\S]*?)\]/);
  if (declarationsMatch) {
    const declarations = declarationsMatch[1];
    if (!declarations.includes(micro.component)) {
      moduleContent = moduleContent.replace(
        `declarations: [\n    ${declarations.trim()}`,
        `declarations: [\n    ${micro.component},\n    ${declarations.trim()}`
      );
    }
  }
  
  // Thêm imports cần thiết
  if (!moduleContent.includes('CurrencyPipe')) {
    moduleContent = moduleContent.replace(
      `import { MatNativeDateModule } from '@angular/material/core';`,
      `import { MatNativeDateModule } from '@angular/material/core';
import { CurrencyPipe, DatePipe } from '@angular/common';`
    );
  }
  
  // Thêm pipes vào imports
  if (!moduleContent.includes('CurrencyPipe')) {
    const importsMatch = moduleContent.match(/imports:\s*\[([\s\S]*?)\]/);
    if (importsMatch) {
      const imports = importsMatch[1];
      moduleContent = moduleContent.replace(
        `imports: [\n    ${imports.trim()}`,
        `imports: [\n    ${imports.trim()},\n    CurrencyPipe,\n    DatePipe`
      );
    }
  }
  
  // Ghi lại file module
  fs.writeFileSync(modulePath, moduleContent);
  
  // Sửa component để bỏ standalone
  let componentContent = fs.readFileSync(componentPath, 'utf8');
  componentContent = componentContent.replace(
    /standalone:\s*true,\s*imports:\s*\[[^\]]*\],/,
    ''
  );
  fs.writeFileSync(componentPath, componentContent);
  
  console.log(`✅ Đã sửa ${micro.name} module`);
});

console.log('🎉 Hoàn thành sửa tất cả modules!'); 