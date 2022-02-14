------WebKitFormBoundaryesfsDF4wzvFv17RY
Content-Disposition: form-data; name="file"; filename="process.sh"
Content-Type: text/x-sh

#!/bin/bash
echo "current process is $$"
find ./ -name test.sh &
echo "the last one daemon process is $!"


------WebKitFormBoundaryesfsDF4wzvFv17RY--
