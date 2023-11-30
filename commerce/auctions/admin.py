from django.contrib import admin
from .models import auction, bids, Comments, sold, Category

# Register your models here.
admin.site.register(auction)
admin.site.register(bids)
admin.site.register(Comments)
admin.site.register(sold)