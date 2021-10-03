import os as _os
import json as _json

from dazzler.system import (
    Package as _Package,
    assets_to_requirements as _ass_to_req
)
from dazzler.tools import get_package_path as _get_package_path

from ._imports_ import *  # noqa: F401, F403
from ._imports_ import __all__

_name = 'dazzler_component_template'

_package_path = _get_package_path(__name__)
_asset_path = _os.path.join(_package_path, 'assets')
_dist_path = _os.path.join(_asset_path, 'dist')
_dev_path = _os.path.join(_asset_path, 'dev')

with open(_os.path.join(_dist_path, 'assets.json')) as f:
    _assets = _json.load(f)

with open(_os.path.join(_dev_path, 'assets.json')) as f:
    _dev = _json.load(f)

_components = []
for _c in __all__:
    _components.append(locals()[_c])

package = _Package(
    _name,
    components=_components,
    requirements=_ass_to_req(
        _dist_path, _assets.get(_name, {}),
        dev_data=_dev.get(_name, {}),
        dev_path=_dev_path,
        package_name=_name,
    )
)
