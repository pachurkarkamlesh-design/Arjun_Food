#!/usr/bin/env python3
import re
import os

files_to_fix = {
    'app/(auth)/login/page.tsx': [
        (r"import { Button } from '@/components/ui/Button';", "import Button from '@/components/ui/Button';"),
        (r"import { Input } from '@/components/ui/Input';", "import Input from '@/components/ui/Input';"),
        (r"import { Logo } from '@/components/ui/Logo';", "import Logo from '@/components/ui/Logo';"),
    ],
    'app/(auth)/register/page.tsx': [
        (r"import { Button } from '@/components/ui/Button';", "import Button from '@/components/ui/Button';"),
        (r"import { Input } from '@/components/ui/Input';", "import Input from '@/components/ui/Input';"),
        (r"import { Logo } from '@/components/ui/Logo';", "import Logo from '@/components/ui/Logo';"),
    ],
    'app/(main)/discover/page.tsx': [
        (r"import { Button } from '@/components/ui/Button'", "import Button from '@/components/ui/Button'"),
    ],
    'app/(main)/mess/[id]/page.tsx': [
        (r"import { Button } from '@/components/ui/Button';", "import Button from '@/components/ui/Button';"),
        (r"import { Badge, DietBadge, StatusBadge } from '@/components/ui/Badge';", "import Badge, { DietBadge, StatusBadge } from '@/components/ui/Badge';"),
    ],
    'app/owner/dashboard/page.tsx': [
        (r"import { Button } from '@/components/ui/Button';", "import Button from '@/components/ui/Button';"),
        (r"import { Badge } from '@/components/ui/Badge';", "import Badge from '@/components/ui/Badge';"),
    ],
    'components/discover/FilterSidebar.tsx': [
        (r"import { Button } from '@/components/ui/Button'", "import Button from '@/components/ui/Button'"),
        (r"import { Input } from '@/components/ui/Input'", "import Input from '@/components/ui/Input'"),
        (r"import { Badge } from '@/components/ui/Badge'", "import Badge from '@/components/ui/Badge'"),
    ],
    'components/ui/Modal.tsx': [
        (r"import { Button } from './Button';", "import Button from './Button';"),
    ],
}

for file_path, replacements in files_to_fix.items():
    full_path = os.path.join('.', file_path)
    if not os.path.exists(full_path):
        print(f"File not found: {full_path}")
        continue

    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {file_path}")
    else:
        print(f"No changes needed: {file_path}")

print("Done!")
