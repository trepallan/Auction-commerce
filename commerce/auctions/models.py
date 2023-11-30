from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db import models
    
    
class Category(models.TextChoices):
    FASHION = 'FASH', 'fashion'
    ELECTRONICS = 'ELECT', 'electronics'
    JEWELRY = 'JEWE', 'jewelry'
    CLOTHING = 'CLOT','clothing'
    BOOKS = 'BOOK', 'books'
    TOYS = 'TOYS', 'toys'
    HOME = 'HOME','home'
    HEALTH = 'HEAL','health'
    GAMES = 'GAME','games'
    

class auction(models.Model):
    title = models.CharField(max_length=15)
    description = models.TextField(max_length=500)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="auctioneer")
    category = models.CharField(max_length=50, choices=Category.choices)
    image = models.URLField(blank=True) 
    watchlist = models.ManyToManyField(User, blank=True, related_name="watchlist")

class bids(models.Model):
    bid = models.DecimalField(max_digits=6, decimal_places=2)
    auction = models.ForeignKey(auction, on_delete=models.CASCADE, related_name="auction")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="caller")
    
    def __str__(self):
        return f"{self.user} bid {self.bid} on {self.auction}"
    
class Comments(models.Model):
    comment = models.TextField(max_length=100)
    user  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="auction_commenter")
    iten = models.ForeignKey(auction, on_delete=models.CASCADE, related_name="auction_product")

    def __str__(self):
        return f"{self.user} coment {self.comment} on {self.iten}" 


class sold(models.Model):
    auction = models.IntegerField()
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="buyer")
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="seller")
    value = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.auction} sold by {self.seller} for {self.value} to {self.buyer}"
