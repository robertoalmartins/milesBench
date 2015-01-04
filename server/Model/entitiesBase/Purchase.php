<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Purchase
 *
 * @ORM\Table(name="purchase", indexes={@ORM\Index(name="fk_purchase_businesspartner1_idx", columns={"businesspartner_id"})})
 * @ORM\Entity
 */
class Purchase
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=2000, nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="purchase_value", type="decimal", precision=20, scale=0, nullable=true)
     */
    private $purchaseValue;

    /**
     * @var \Businesspartner
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Businesspartner")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="businesspartner_id", referencedColumnName="id")
     * })
     */
    private $businesspartner;


    /**
     * Set id
     *
     * @param integer $id
     * @return Purchase
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Purchase
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set purchaseValue
     *
     * @param string $purchaseValue
     * @return Purchase
     */
    public function setPurchaseValue($purchaseValue)
    {
        $this->purchaseValue = $purchaseValue;

        return $this;
    }

    /**
     * Get purchaseValue
     *
     * @return string 
     */
    public function getPurchaseValue()
    {
        return $this->purchaseValue;
    }

    /**
     * Set businesspartner
     *
     * @param \Businesspartner $businesspartner
     * @return Purchase
     */
    public function setBusinesspartner(\Businesspartner $businesspartner)
    {
        $this->businesspartner = $businesspartner;

        return $this;
    }

    /**
     * Get businesspartner
     *
     * @return \Businesspartner 
     */
    public function getBusinesspartner()
    {
        return $this->businesspartner;
    }
}
