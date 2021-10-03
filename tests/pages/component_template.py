from dazzler.system import Page
from dazzler.components.core import Container

from dazzler_component_template import ComponentTemplate

page = Page(
    __name__,
    Container([
        ComponentTemplate(),
    ]),
    url='/'
)
